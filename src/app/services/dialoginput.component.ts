import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'dialog-input-box',
  template: `<div mat-dialog-content>
  <p>Write Your Comments</p>
  <mat-form-field>
    <textarea matInput  [(ngModel)]="data.comments"></textarea>
  </mat-form-field>
</div>
<div mat-dialog-actions>
  <button mat-button >Cancel</button>
  <button mat-button [mat-dialog-close]="data.comments" cdkFocusInitial>Ok</button>
</div>
`,
})
export class DialogInputComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogInputComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {}
}