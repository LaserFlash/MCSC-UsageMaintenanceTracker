import { MdDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
    selector: 'confirm-dialog',
    template: `
        <h1 md-dialog-title>{{ title }}</h1>
        <md-dialog-content style='font-family: Roboto, "Helvetica Neue", sans-serif;'><pre style='margin:0px; font-family: Roboto, "Helvetica Neue", sans-serif;'>{{message}}</pre></md-dialog-content>
        <md-dialog-actions style='padding: 8px; padding-left:0px; margin-right:-24px;'>
        <span style='flex: 1 1 auto;'></span>
          <button md-button (click)="dialogRef.close()">Cancel</button>
          <button md-button style='margin-left: 8px;'color="warn" (click)="dialogRef.close(true)">{{button}}</button>
        </md-dialog-actions>
    `,
})
export class ConfirmDialog {
    public title: string;
    public message: string;
    public button: string;
    constructor(public dialogRef: MdDialogRef<ConfirmDialog>) {}
}
