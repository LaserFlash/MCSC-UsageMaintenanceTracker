import { Observable } from 'rxjs/Rx';
import { ConfirmDialog } from './confirm-dialog.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogsService {
    constructor(private dialog: MatDialog) {}
    public confirm(title: string, message: string, button: string): Observable<boolean> {
        let dialogRef: MatDialogRef<ConfirmDialog>;
        dialogRef = this.dialog.open(ConfirmDialog);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.button = button;
        return dialogRef.afterClosed();
    }
}
