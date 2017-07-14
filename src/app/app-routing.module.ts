import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportIssueComponent }   from './report-issue/report-issue.component';
import { ViewIssuesComponent }      from './view-issues/view-issues.component';
import { ViewFixedComponent }  from './view-fixed/view-fixed.component';


const routes: Routes = [
  { path: '', redirectTo: '/report', pathMatch: 'full' },
  { path: 'report',  component: ReportIssueComponent },
  { path: 'reported', component: ViewIssuesComponent },
  { path: 'fixed',     component: ViewFixedComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}
