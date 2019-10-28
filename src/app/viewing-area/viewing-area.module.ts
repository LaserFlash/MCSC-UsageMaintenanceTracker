import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewingAreaRoutingModule } from './viewing-area-routing.module';

/* Import Services/Providers */
import { BoatBreakageService } from './shared/providers/boat-breakage.service';
import { BoatUsageService } from './pages/view-usage/providers/boat-usage.service';

/* Import the sub-pages */
import { ViewingAreaComponent } from './viewing-area.component';
import { ViewUsageComponent } from './pages/view-usage/view-usage.component';
import { ViewIssuesComponent } from './pages/view-issues/view-issues.component';
import { ViewFixedComponent } from './pages/view-fixed/view-fixed.component';

/* Custom Components */
import { BreakageCardModule } from '../ui/breakage-card/breakage-card.module';
import { UsageCardComponent } from './pages/view-usage/components/usage-card/usage-card.component';
import { SortFilterBarComponent } from '../ui/sort-filter-bar/sort-filter-bar.component';

/* Import Material2 things */
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';

import { ChartsModule } from 'ng2-charts';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    ViewingAreaComponent,
    ViewUsageComponent,
    ViewIssuesComponent,
    ViewFixedComponent,
    SortFilterBarComponent,
    UsageCardComponent
  ],
  imports: [
    CommonModule,
    ViewingAreaRoutingModule,
    BreakageCardModule,
    FlexLayoutModule,
    MatCardModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatMenuModule,
    MatChipsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatPaginatorModule,
    ChartsModule,
  ],
  providers: [
    BoatBreakageService,
    BoatUsageService
  ]
})
export class ViewingAreaModule { }
