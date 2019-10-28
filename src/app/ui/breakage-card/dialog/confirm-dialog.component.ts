import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';

@Component({
    selector: 'confirm-dialog',
    template: `
        <h1 mat-dialog-title>{{ title }}</h1>
        <mat-dialog-content style='font-family: Roboto, "Helvetica Neue", sans-serif;'>
            <pre style='margin:0px; font-family: Roboto, "Helvetica Neue", sans-serif;'>
                {{message}}
            </pre>
        </mat-dialog-content>
        <mat-dialog-actions style='padding: 8px; padding-left:0px; margin-right:-24px;'>
        <span style='flex: 1 1 auto;'></span>
          <button mat-button (click)="dialogRef.close()">Cancel</button>
          <button mat-button style='margin-left: 8px;'color="warn" (click)="dialogRef.close(true)">{{button}}</button>
        </mat-dialog-actions>
    `,
})
export class ConfirmDialogComponent {
    public title: string;
    public message: string;
    public button: string;
    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}
}
