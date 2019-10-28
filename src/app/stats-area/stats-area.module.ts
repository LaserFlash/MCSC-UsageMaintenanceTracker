import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsAreaRoutingModule } from './stats-area-routing.module';
import { StatsAreaComponent } from './stats-area.component';

/* Import the sub-pages */
import { TmpStatsComponent } from './pages/tmp-stats/tmp-stats.component';

/* Import Material2 things */
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    StatsAreaComponent,
    TmpStatsComponent
  ],
  imports: [
    CommonModule,
    StatsAreaRoutingModule,
    FlexLayoutModule,
    MatCardModule,
    MatToolbarModule,
    MatTabsModule
  ]
})
export class StatsAreaModule { }
