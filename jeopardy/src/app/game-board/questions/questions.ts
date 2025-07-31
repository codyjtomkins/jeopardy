import { Component, inject, input, viewChild } from '@angular/core';
import { MatDialog, MatDialogContainer, MatDialogRef } from '@angular/material/dialog';
import { TileContent } from '../../model/models';

@Component({
  selector: 'app-questions',
  imports: [
    MatDialogContainer
  ],
  templateUrl: './questions.html',
  styleUrl: './questions.scss'
})
export class Questions {
  content = input<TileContent | undefined>()

  dialogRef = inject(MatDialogRef<Questions>)
}
