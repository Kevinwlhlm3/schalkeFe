import { Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlayerService } from '../services/player.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NgIfContext } from '@angular/common';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.scss'],
})
export class PlayerEditComponent implements OnInit{

  playerForm: FormGroup;
  addPopup: TemplateRef<NgIfContext<any>> | null | undefined;

  nationality: string [] = [
    'Deutschland',
    'Polen',
    'Österreich',
    'Niederlande',
    'Schweiz',
    'Uruguay',
    'Türkei',
    'Frankreich',
    'Kosovo',
    'Japan',
    'Mali'
  ]


  ngOnInit(): void {
    this.playerForm.patchValue(this.data);
  }

  constructor(private _fb: FormBuilder, private _fb1: FormBuilder, private _playerService: PlayerService,  private _dialogRef: MatDialogRef<PlayerEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar){
    this.playerForm = this._fb.group({
      firstName: '',
      lastName: '',
      country: '',
      trikot: '',
      games: '',
      goals: '',
      assists: '',
      result: ''
    })
  }

  onCreateFormSubmit() {
    if (this.playerForm.valid) {
      if (this.data) {
        this._playerService
          .updatePlayer(this.data.id, this.playerForm.value)
          .subscribe({
            next: (val: any) => {
              this._snackBar.open('Neuer Scorerpunkt!', '', {
                duration: 2000,
                verticalPosition: 'top'
              });
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._playerService.createPlayer(this.playerForm.value).subscribe({
          next: (val: any) => {
            this._snackBar.open('Neuer Scorer!', '', {
              duration: 2000,
              verticalPosition: 'top'
            });
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

  deletePlayer(): void{
    if (this.data) {
    this._playerService.deletePlayer(this.data.id).subscribe(data => 
      {
        this._snackBar.open('Erfolgreich gelöscht!', '', {
          duration: 2000,
          verticalPosition: 'top'
        });
        this._dialogRef.close(true);
      })
    }

  }

}
