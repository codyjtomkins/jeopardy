import { GameStore } from './../store/game-store';
import { Component, computed, effect, inject, signal, Signal, WritableSignal } from '@angular/core';
import { Tile } from './tile/tile';
import { Questions } from "./questions/questions";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { first, tap } from 'rxjs';
import { TileContent } from '../model/models';
@Component({
  selector: 'app-game-board',
  imports: [
    Tile,
    Questions,
],
  providers: [
    MatDialog,
    {
       provide: MatDialogRef,
       useValue: {}
    },
    GameStore
  ],
  templateUrl: './game-board.html',
  styleUrl: './game-board.scss'
})
export class GameBoard {

  readonly store = inject(GameStore)

  columns = computed(() => this.store.columns())

  currentContent = signal<TileContent | undefined>(undefined)

  dialog = inject(MatDialog)

  openQuestion(content: TileContent | undefined) {
    this.currentContent.set(content)
    const dialogRef = this.dialog.open(Questions, {
      width: '250px',
      data: content
    })

    dialogRef.afterClosed().pipe(
      first(),
      tap(() => this.currentContent()?.done?.set(true))
    ).subscribe(result => console.log('dialog closed'))
  }
}
