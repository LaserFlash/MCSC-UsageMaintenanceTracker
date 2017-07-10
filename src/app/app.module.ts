import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MdSidenavModule } from '@angular/material';
import { MdTabsModule } from '@angular/material';
import { MdListModule } from '@angular/material';
import { MdToolbarModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';
import { MdIconModule } from '@angular/material';
import { MdCardModule } from '@angular/material';
import {MdRadioModule} from '@angular/material';
import {MdInputModule} from '@angular/material';
import {MdDatepickerModule} from '@angular/material';
import {MdNativeDateModule} from '@angular/material';

import { AppComponent } from './app.component';
import { ReportIssueComponent } from './report-issue/report-issue.component';
import { ViewIssuesComponent } from './view-issues/view-issues.component';
import { ViewFixedComponent } from './view-fixed/view-fixed.component';
import { AppRoutingModule }   from './app-routing.module';

import { OverlayContainer } from '@angular/material';
import { ReportUsageComponent } from './report-usage/report-usage.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportIssueComponent,
    ViewIssuesComponent,
    ViewFixedComponent,
    ReportUsageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.themeClass = 'my-app-theme';
  }
}
