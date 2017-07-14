import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MdSidenavModule } from '@angular/material';
import { MdTabsModule } from '@angular/material';
import { MdListModule } from '@angular/material';
import { MdToolbarModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';
import { MdIconModule } from '@angular/material';

import { AppComponent } from './app.component';
import { ReportIssueComponent } from './report-issue/report-issue.component';
import { ViewIssuesComponent } from './view-issues/view-issues.component';
import { ViewFixedComponent } from './view-fixed/view-fixed.component';
import { AppRoutingModule }   from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ReportIssueComponent,
    ViewIssuesComponent,
    ViewFixedComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
