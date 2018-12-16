import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

import { DialogInputComponent } from './dialoginput.component';

interface confirmData {
  title?: string,
  message?: string,
  comments?: string,
  confirm:boolean,
}

@Injectable()
export class DialogInputService {

  constructor(private dialog: MatDialog) { }

  public showinputbox(data:confirmData): Observable<boolean> {
    data.title = data.title || 'Confirm';
    data.message = data.message || 'Are you sure?';
    data.confirm = data.confirm || false;
    data.comments = data.comments || '';
    let dialogRef: MatDialogRef<DialogInputComponent>;
    dialogRef = this.dialog.open(DialogInputComponent, {
      width: '380px',
      disableClose: false,
      data: {title: data.title, message: data.message, comments : data.comments}
    });
    return dialogRef.afterClosed();
  }
}