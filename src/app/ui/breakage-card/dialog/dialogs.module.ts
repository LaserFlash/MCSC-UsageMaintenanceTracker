import { DialogsService } from './dialogs.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';

import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ImageModalComponent } from './image-modal.component';

@NgModule({
    imports: [
        MatDialogModule,
        MatButtonModule,
    ],
    exports: [
        ConfirmDialogComponent,
        ImageModalComponent,
    ],
    declarations: [
        ConfirmDialogComponent,
        ImageModalComponent,
    ],
    providers: [
        DialogsService,
    ],
    entryComponents: [
        ConfirmDialogComponent,
        ImageModalComponent,
    ],
})
export class DialogsModule { }
