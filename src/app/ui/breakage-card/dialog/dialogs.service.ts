import { Observable } from 'rxjs/Observable';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ImageModalComponent } from './image-modal.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogsService {
  constructor(private dialog: MatDialog) { }
  public confirm(title: string, message: string, button: string): Observable<boolean> {
    let dialogRef: MatDialogRef<ConfirmDialogComponent>;
    dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.button = button;
    return dialogRef.afterClosed();
  }
  public imageModal(imageURL: string): Observable<boolean> {
    let dialogRef: MatDialogRef<ImageModalComponent>;
    dialogRef = this.dialog.open(ImageModalComponent);
    dialogRef.componentInstance.imageURL = imageURL;
    return dialogRef.afterClosed();
  }
}
