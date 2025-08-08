import { GameStore } from './../store/game-store';
import { Component, computed, effect, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { Tile } from './tile/tile';
import { Questions } from "./questions/questions";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { first, tap } from 'rxjs';
import { TileContent } from '../model/models';
@Component({
  selector: 'app-game-board',
  imports: [
    Tile
],
  providers: [
    MatDialog,
    {
       provide: MatDialogRef,
       useValue: {}
    }
  ],
  templateUrl: './game-board.html',
  styleUrl: './game-board.scss'
})
export class GameBoard implements OnInit {

  readonly store = inject(GameStore)

  columns = computed(() => this.store.columns())

  currentContent = signal<TileContent | undefined>(undefined)

  dialog = inject(MatDialog)

  ngOnInit(): void {
    this.store.setGameName('game1')
  }

  openQuestion(content: TileContent | undefined) {
    this.currentContent.set(content)
    const dialogRef = this.dialog.open(Questions, {
      maxHeight: '40vw',
      maxWidth: '100vw',
      height: '40vw',
      width: '90vw',
      disableClose: true,
      data: { content: this.currentContent() }
    })

    dialogRef.afterClosed().pipe(
      first(),
      tap(() => this.currentContent()?.done?.set(true))
    ).subscribe()
  }
}
