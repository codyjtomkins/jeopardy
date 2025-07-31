import { UpperCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { TileContent } from '../../model/models';

@Component({
  selector: 'app-tile',
  imports: [
    MatCard,
    UpperCasePipe
  ],
  templateUrl: './tile.html',
  styleUrl: './tile.scss'
})
export class Tile {
  content = input<TileContent | undefined>()
  display = input.required<string>()

  outputContent = output<TileContent | undefined>()

  onClick(content: TileContent | undefined) {
    this.outputContent.emit(content)
  }
}
