import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameBoard } from "./game-board/game-board";
import { GameService } from './service/game-service';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GameBoard],
  providers: [GameService],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('jeopardy');
}
