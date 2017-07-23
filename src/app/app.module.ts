import { BrowserModule }              from '@angular/platform-browser';
import { NgModule }                   from '@angular/core';
import { ReactiveFormsModule }        from '@angular/forms';

import { BrowserAnimationsModule }      from '@angular/platform-browser/animations';
import { FlexLayoutModule }           from "@angular/flex-layout";

import { MdSidenavModule }            from '@angular/material';
import { MdTabsModule }               from '@angular/material';
import { MdListModule }               from '@angular/material';
import { MdToolbarModule }            from '@angular/material';
import { MdButtonModule }             from '@angular/material';
import { MdIconModule }               from '@angular/material';
import { MdCardModule }               from '@angular/material';
import { MdRadioModule }              from '@angular/material';
import { MdInputModule }              from '@angular/material';
import { MdDatepickerModule }         from '@angular/material';
import { MdNativeDateModule }         from '@angular/material';
import { MdSnackBarModule }           from '@angular/material';
import { MdSelectModule }             from '@angular/material';
import { DialogsModule }              from './dialog/dialogs.module';
import { MdMenuModule }               from '@angular/material';
import { MdChipsModule }              from '@angular/material';

import { AppComponent }               from './app.component';
import { ReportIssueComponent }       from './report-issue/report-issue.component';
import { ReportUsageComponent }       from './report-usage/report-usage.component';
import { ViewIssuesComponent }        from './view-issues/view-issues.component';
import { ViewFixedComponent }         from './view-fixed/view-fixed.component';
import { AppRoutingModule }           from './app-routing.module';
import { BreakageCardComponent }      from'./breakage-card/breakage-card.component';

import { BoatUsageService }           from './boat-usage.service'
import { BoatBreakageService }        from './boat-breakage.service'

import { OverlayContainer }           from '@angular/material';

import { AngularFireModule }          from 'angularfire2';
import { AngularFireDatabaseModule }  from 'angularfire2/database';
import { environment }                from '../environments/environment';

import { CookieModule }               from 'ngx-cookie';
import { SortFilterBarComponent } from './sort-filter-bar/sort-filter-bar.component';
import { SafetyProceduresComponent } from './safety-procedures/safety-procedures.component';

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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdSidenavModule,
    MdTabsModule,
    MdListModule,
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    AppRoutingModule,
    MdCardModule,
    MdRadioModule,
    MdInputModule,
    MdDatepickerModule,
    MdNativeDateModule,
    ReactiveFormsModule,
    MdSelectModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    MdSnackBarModule,
    CookieModule.forRoot(),
    DialogsModule,
    MdMenuModule,
    MdChipsModule,
  ],
  providers: [BoatUsageService,BoatBreakageService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.themeClass = 'my-app-theme';
  }
}
