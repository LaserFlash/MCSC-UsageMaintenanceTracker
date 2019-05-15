import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

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
import { MatTooltipModule } from '@angular/material/tooltip';
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
import { UsageCardComponent } from './view-view/view-usage/usage-card/usage-card.component';

import { OverlayContainer } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';


import { BoatUsageService } from './boat-usage.service';
import { BoatBreakageService } from './boat-breakage.service';
import { SafetyDocsService } from './safety-docs.service';
import { BoatPartsService } from './boat-parts.service';
import { ThemeTrackerService } from './theme-tracker.service';
import { AuthenticationService } from './authentication.service';

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
import { HammerConfig } from './hammer.config'
import 'hammerjs';
import { SignupComponent } from './authenticate/signup/signup.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { FirebaseUIModule, firebase, firebaseui } from 'firebaseui-angular';

import { InlineEditInputComponent } from './shared/inline-edit-input/inline-edit-input.component';
import { AdminComponent } from './admin/admin.component';
import { ModifyBoatsComponent } from './modify-boats/modify-boats.component';
import { InlineEditInputBoatsComponent } from './modify-boats/inline-edit-input-boats/inline-edit-input-boats.component';
import { ElevateUserComponent } from './elevate-user/elevate-user.component';


const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  tosUrl: '',
  privacyPolicyUrl: '',
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
  autoUpgradeAnonymousUsers: true
};


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
    UsageCardComponent,
    SortFilterBarComponent,
    UsageGraphsComponent,
    LastUsesComponent,
    SafetyDocsComponent,
    BoatPartsComponent,
    ViewUsageComponent,
    ReportIncidentComponent,
    TmpStatsComponent,
    SignupComponent,
    InlineEditInputComponent,
    InlineEditInputBoatsComponent,
    AdminComponent,
    ModifyBoatsComponent,
    ElevateUserComponent
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
    MatExpansionModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatTooltipModule,
    FormsModule,
    MatSelectModule,
    MatDividerModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    MatSnackBarModule,
    CookieModule.forRoot(),
    DialogsModule,
    MatMenuModule,
    MatChipsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    ChartsModule,
    MatListModule,
    MatCheckboxModule,
    MatStepperModule,
    CloudinaryModule.forRoot({ Cloudinary }, { cloud_name: 'dhnh6uqep', upload_preset: 'oyywau4l' }),
    FileUploadModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    ScrollingModule,
  ],
  providers: [
    BoatUsageService,
    BoatBreakageService,
    SafetyDocsService,
    BoatPartsService,
    ThemeTrackerService,
    AuthenticationService,
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('my-app-theme');
  }
}
