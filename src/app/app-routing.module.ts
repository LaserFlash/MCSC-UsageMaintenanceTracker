import { NgModule }             from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { ReportIssueComponent }   from './report-issue/report-issue.component';
import { ViewIssuesComponent }      from './view-issues/view-issues.component';
import { ViewFixedComponent }  from './view-fixed/view-fixed.component';
import { ReportUsageComponent }  from './report-usage/report-usage.component';
import { InfoComponent }  from './info/info.component';


const routes: Routes = [
  { path: '', redirectTo: '/reportUsage', pathMatch: 'full' },
  { path: 'report',  component: ReportIssueComponent },
  { path: 'reported', component: ViewIssuesComponent },
  { path: 'fixed',     component: ViewFixedComponent },
  { path: 'reportUsage',     component: ReportUsageComponent },
  { path: 'info',     component: InfoComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}
