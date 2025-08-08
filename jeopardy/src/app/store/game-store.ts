import { computed, inject, InjectionToken, signal } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { Column } from '../model/models';
import { GameService } from '../service/game-service';
import { tap } from 'rxjs';

type GameState = {
  gameName: string
  columns: Column[]
}

const initialState: GameState = {
  gameName: '',
  columns: []
}

export const GameStore = signalStore(
  {providedIn: 'root' },
  withState(initialState),
  withComputed(({columns}) => ({
    columns: computed(() => columns())
  })),
  withMethods((store, gameService = inject(GameService)) => ({
    getGame(fileName: string) {
      gameService.getGame(fileName).pipe(
        tap((columns) => {
          for(let column of columns) {
            for(let content of column.content) {
              content.done = signal(false)
            }
          }
          patchState(store, {columns})
        })
      ).subscribe()
    },
    setGameName(gameName: string) {
      patchState(store, {gameName})
      this.getGame(store.gameName())
    }
  })),
  withHooks({

  })
)
