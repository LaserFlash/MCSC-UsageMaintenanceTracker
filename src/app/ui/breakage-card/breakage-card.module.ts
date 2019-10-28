import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Import Building components */
import { BreakageCardComponent } from './breakage-card.component';
import { DialogsModule } from './dialog/dialogs.module';
import { DialogsService } from './dialog/dialogs.service';
import { ImportanceConversionHelper } from '../../core/constants/menu-names/nameConversion';

import { SharedServicesModule } from '../../core/shared-services.module';

/* Import Material2 */
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    BreakageCardComponent,
  ],
  imports: [
    CommonModule,
    DialogsModule,
    FlexLayoutModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    SharedServicesModule

  ],
  providers: [
    DialogsService,
    ImportanceConversionHelper
  ],
  exports: [
    BreakageCardComponent
  ],
})
export class BreakageCardModule { }
