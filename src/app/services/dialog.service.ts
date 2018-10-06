import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

import { DialogComponent } from './dialog.component';

interface confirmData {
  title?: string,
  message?: string,
  confirm:boolean,
}

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) { }

  public confirm(data:confirmData): Observable<boolean> {
    data.title = data.title || 'Confirm';
    data.message = data.message || 'Are you sure?';
    data.confirm = data.confirm || false;
    let dialogRef: MatDialogRef<DialogComponent>;
    dialogRef = this.dialog.open(DialogComponent, {
      width: '380px',
      disableClose: false,
      data: {title: data.title, message: data.message}
    });
    return dialogRef.afterClosed();
  }
}