import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Players} from './players';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private _http: HttpClient) { }

  updatePlayer(id: number, data: any): Observable<any> {
    return this._http.put('https://kvnwlhlm3.net/schalkeFeApi/updatePlayer.php?id=' + id, data);
  }

  createPlayer(data: any): Observable<any>{
    return this._http.post('https://kvnwlhlm3.net/schalkeFeApi/createPlayer.php', data);
  }

  getPlayer(): Observable<any> {
    return this._http.get<Players[]>('https://kvnwlhlm3.net/schalkeFeApi/getPlayers.php');
  }

  deletePlayer(id: number): Observable<any> {
    return this._http.delete('https://kvnwlhlm3.net/schalkeFeApi/deletePlayer.php?id=' + id);
  }
}
