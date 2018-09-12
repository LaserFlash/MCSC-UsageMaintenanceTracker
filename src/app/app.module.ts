import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ChartsModule } from 'ng2-charts';

import { MatSidenavModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatRadioModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatMenuModule } from '@angular/material';
import { MatChipsModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';

import { DialogsModule } from './shared/dialog/dialogs.module';

import { AppComponent } from './app.component';

import { ReportComponent } from './view-report/report.component';
import { ViewComponent } from './view-view/view.component';
import { StatsComponent } from './view-stats/stats.component';
import { DocsComponent } from './view-docs/docs.component';

import { ReportIssueComponent } from './view-report/report-issue/report-issue.component';
import { ReportUsageComponent } from './view-report/report-usage/report-usage.component';
import { ViewIssuesComponent } from './view-view/view-issues/view-issues.component';
import { ViewFixedComponent } from './view-view/view-fixed/view-fixed.component';
import { BoatPartsComponent } from './view-docs/boat-parts/boat-parts.component';
import { SafetyDocsComponent } from './view-docs/safety-docs/safety-docs.component';
import { ViewUsageComponent } from './view-view/view-usage/view-usage.component';
import { ReportIncidentComponent } from './view-report/report-incident/report-incident.component';
import { TmpStatsComponent } from './view-stats/tmp-stats/tmp-stats.component';


import { AppRoutingModule } from './app-routing.module';
import { BreakageCardComponent } from './shared/breakage-card/breakage-card.component';

import { OverlayContainer } from '@angular/cdk/overlay';

import { BoatUsageService } from './boat-usage.service';
import { BoatBreakageService } from './boat-breakage.service';
import { SafetyDocsService } from './safety-docs.service';
import { BoatPartsService } from './boat-parts.service';
import { ThemeTrackerService } from './theme-tracker.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../environments/environment';

import { CookieModule } from 'ngx-cookie';
import { SortFilterBarComponent } from './shared/sort-filter-bar/sort-filter-bar.component';
import { UsageGraphsComponent } from './view-report/report-usage/usage-graphs/usage-graphs.component';
import { LastUsesComponent } from './view-report/report-usage/last-uses/last-uses.component';

// Cloudinary module
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import { FileUploadModule } from 'ng2-file-upload';

import { ServiceWorkerModule } from '@angular/service-worker';

import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HammerConfig } from './hammer.config';
import 'hammerjs';
import { UsageCardComponent } from './view-view/view-usage/usage-card/usage-card.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    ViewComponent,
    StatsComponent,
    DocsComponent,

    ReportIssueComponent,
    ViewIssuesComponent,
    ViewFixedComponent,
    ReportUsageComponent,
    BreakageCardComponent,
    SortFilterBarComponent,
    UsageGraphsComponent,
    LastUsesComponent,
    SafetyDocsComponent,
    BoatPartsComponent,
    ViewUsageComponent,
    ReportIncidentComponent,
    TmpStatsComponent,
    UsageCardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatTabsModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule,
    MatCardModule,
    MatRadioModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDividerModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    MatSnackBarModule,
    CookieModule.forRoot(),
    DialogsModule,
    MatMenuModule,
    MatChipsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    ChartsModule,
    MatListModule,
    MatCheckboxModule,
    MatStepperModule,
    MatExpansionModule,
    CloudinaryModule.forRoot({ Cloudinary }, { cloud_name: 'dhnh6uqep', upload_preset: 'oyywau4l' }),
    FileUploadModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    BoatUsageService,
    BoatBreakageService,
    SafetyDocsService,
    BoatPartsService,
    ThemeTrackerService,
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('my-app-theme');
  }
}
