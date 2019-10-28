import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportAreaRoutingModule } from './report-area-routing.module';

/* Import the sub-pages */
import { ReportAreaComponent } from './report-area.component';
import { ReportUsageComponent } from './pages/report-usage/report-usage.component';
import { ReportIssueComponent } from './pages/report-issue/report-issue.component';
import { ReportIncidentComponent } from './pages/report-incident/report-incident.component';


/* Import Services/Providers */
import { BoatBreakageService } from './shared/providers/boat-breakage.service';
import { BoatUsageService } from './shared/providers/boat-usage.service';

/* Custom Components */
import { LastUsesComponent } from './pages/report-usage/components/last-uses/last-uses.component';
import { UsageGraphsComponent } from './pages/report-usage/components/usage-graphs/usage-graphs.component';
import { BreakageCardModule } from '../ui/breakage-card/breakage-card.module';

/* Forms */
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

/* Import Material2 things */
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { ChartsModule } from 'ng2-charts';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FileUploadModule } from 'ng2-file-upload';
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';

@NgModule({
  declarations: [
    ReportAreaComponent,
    ReportIncidentComponent,
    ReportUsageComponent,
    ReportIssueComponent,
    ReportIncidentComponent,
    LastUsesComponent,
    UsageGraphsComponent,
  ],
  imports: [
    CommonModule,
    ReportAreaRoutingModule,
    BreakageCardModule,
    FlexLayoutModule,
    MatCardModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    MatProgressBarModule,
    MatMenuModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatStepperModule,
    MatSnackBarModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule,
    ChartsModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    CloudinaryModule.forRoot({ Cloudinary }, { cloud_name: 'dhnh6uqep', upload_preset: 'oyywau4l' }),
    FileUploadModule,
  ],
  providers: [
    BoatBreakageService,
    BoatUsageService
  ]
})
export class ReportAreaModule { }
