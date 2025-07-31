import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Column } from '../model/models';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  httpClient = inject(HttpClient)

  getGame(fileName: string): Observable<Column[]> {
    return this.httpClient.get(`/game-lists/${fileName}`).pipe(
      map((data) => data as Column[])
    )
  }

}
