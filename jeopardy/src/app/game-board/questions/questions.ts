import { Component, computed, HostListener, Inject, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { TileContent } from '../../model/models';
import { NgClass, NgOptimizedImage, UpperCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { GameStore } from '../../store/game-store';

@Component({
  selector: 'app-questions',
  imports: [
    MatDialogContent,
    UpperCasePipe,
    MatButtonModule,
    NgOptimizedImage,
    NgClass
  ],
  templateUrl: './questions.html',
  styleUrl: './questions.scss'
})
export class Questions {
  store = inject(GameStore)
  imageLocation = computed(() => this.data.content.type === 'image' ? `game-lists/${this.store.gameName()}/images/${this.data.content.question}` : null)
  dialogRef = inject(MatDialogRef<Questions>)

  shownContent = signal<'question' | 'answer'>('question')

  constructor(@Inject(MAT_DIALOG_DATA) public data: {content: TileContent}) {}

  @HostListener('window:keyup.esc') close() {
    this.dialogRef.close();
  }
  @HostListener('window:keyup.enter')
  @HostListener('window:keyup.arrowRight')
  getAnswer() {
    this.flipView('answer');
  }
  @HostListener('window:keyup.backspace')
  @HostListener('window:keyup.arrowLeft')
  getQuestion() {
    this.flipView('question');
  }

  flipView(option?: 'question' | 'answer') {
    if(option) {
      this.shownContent.set(option)
    } else {
      this.shownContent.set(this.shownContent() === 'question' ? 'answer' : 'question')
    }
  }
}
