import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";

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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material';
import { MatStepperModule } from '@angular/material/stepper';

import { DialogsModule } from './dialog/dialogs.module';

import { AppComponent } from './app.component';
import { ReportIssueComponent } from './report-issue/report-issue.component';
import { ReportUsageComponent } from './report-usage/report-usage.component';
import { ViewIssuesComponent } from './view-issues/view-issues.component';
import { ViewFixedComponent } from './view-fixed/view-fixed.component';
import { AppRoutingModule } from './app-routing.module';
import { BreakageCardComponent } from './breakage-card/breakage-card.component';

import { OverlayContainer } from '@angular/cdk/overlay';

import { BoatUsageService } from './boat-usage.service'
import { BoatBreakageService } from './boat-breakage.service'
import { SafetyDocsService } from './safety-docs.service'
import { ThemeTrackerService } from './theme-tracker.service'

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../environments/environment';

import { CookieModule } from 'ngx-cookie';
import { SortFilterBarComponent } from './sort-filter-bar/sort-filter-bar.component';
import { SafetyProceduresComponent } from './safety-procedures/safety-procedures.component';
import { UsageGraphsComponent } from './usage-graphs/usage-graphs.component';
import { LastUsesComponent } from './last-uses/last-uses.component';

// Cloudinary module
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import { FileUploadModule } from 'ng2-file-upload';

import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
    ReportIssueComponent,
    ViewIssuesComponent,
    ViewFixedComponent,
    ReportUsageComponent,
    BreakageCardComponent,
    SortFilterBarComponent,
    SafetyProceduresComponent,
    UsageGraphsComponent,
    LastUsesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'dhnh6uqep', upload_preset: 'oyywau4l' }),
    FileUploadModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
  ],
  providers: [BoatUsageService, BoatBreakageService, SafetyDocsService, ThemeTrackerService,],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('my-app-theme');
  }
}
