import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlayerEditComponent } from './player-edit/player-edit.component';
import { PlayerService } from './services/player.service';
import { Players } from './services/players';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortable, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'schalkeFe';
  players:Players[] | undefined;
  displayedColumns: string[] = ['lastName', 'games', 'goals', 'assists', 'result', 'edit'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static:true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _playerService: PlayerService){}

  ngOnInit(): void {
    this.getPlayer();
    this.paginator._intl.itemsPerPageLabel = "Spieler pro Seite";
  }

  openAddEditPlayerForm(){
    const dialogRef = this._dialog.open(PlayerEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
            this.getPlayer();
        }
        
      }
    })
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(PlayerEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPlayer();
        }
      },
    });
  }

  getPlayer(){
    this._playerService.getPlayer()
    .subscribe((data: Players[]) => {
      this.players=data;
      this.dataSource = new MatTableDataSource(this.players);
      this.dataSource.sort = this.sort;
      const sortState : Sort = { active: 'goals', direction: 'desc'};
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
