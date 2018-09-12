import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';


import { ReportUsageComponent } from './report-usage/report-usage.component';
import { ReportIssueComponent } from './report-issue/report-issue.component';

const reportRoutes: Routes = [
  { path: 'usage', component: ReportUsageComponent, outlet: 'report-outlet' },
  { path: 'issues', component: ReportIssueComponent, outlet: 'report-outlet' },
];

@NgModule({
  imports: [RouterModule.forChild(reportRoutes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
