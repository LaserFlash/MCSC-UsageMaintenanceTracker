import { Observable } from 'rxjs/Rx';
import { ConfirmDialog } from './confirm-dialog.component';
import { ImageModal } from './image-modal.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogsService {
  constructor(private dialog: MatDialog) { }
  public confirm(title: string, message: string, button: string): Observable<boolean> {
    let dialogRef: MatDialogRef<ConfirmDialog>;
    dialogRef = this.dialog.open(ConfirmDialog);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.button = button;
    return dialogRef.afterClosed();
  }
  public imageModal(imageURL: string): Observable<boolean> {
    let dialogRef: MatDialogRef<ImageModal>;
    dialogRef = this.dialog.open(ImageModal);
    dialogRef.componentInstance.imageURL = imageURL;
    return dialogRef.afterClosed();
  }
}
