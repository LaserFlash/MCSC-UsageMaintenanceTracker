import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { ReportComponent } from './view-report/report.component';
import { ReportUsageComponent } from './view-report/report-usage/report-usage.component';
import { ReportIssueComponent } from './view-report/report-issue/report-issue.component';
import { ReportIncidentComponent } from './view-report/report-incident/report-incident.component';

import { ViewComponent } from './view-view/view.component';
import { ViewUsageComponent } from './view-view/view-usage/view-usage.component';
import { ViewFixedComponent } from './view-view/view-fixed/view-fixed.component';
import { ViewIssuesComponent } from './view-view/view-issues/view-issues.component';

import { StatsComponent } from './view-stats/stats.component';
import { TmpStatsComponent } from './view-stats/tmp-stats/tmp-stats.component';

import { DocsComponent } from './view-docs/docs.component';
import { BoatPartsComponent } from './view-docs/boat-parts/boat-parts.component';
import { SafetyDocsComponent } from './view-docs/safety-docs/safety-docs.component';

import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  { path: '', redirectTo: 'report', pathMatch: 'full' },
  {
    path: 'report', component: ReportComponent,
    children: [
      { path: '', redirectTo: 'usage', pathMatch: 'full' },
      { path: 'usage', component: ReportUsageComponent, data: { state: '0' } },
      { path: 'issue', component: ReportIssueComponent, data: { state: '1' } },
      { path: 'incident', component: ReportIncidentComponent, data: { state: '2' } },
      { path: '**', redirectTo: 'usage' },
    ]
  },
  {
    path: 'view', component: ViewComponent,
    children: [
      { path: '', redirectTo: 'usage', pathMatch: 'full' },
      { path: 'usage', component: ViewUsageComponent, data: { state: '0' } },
      { path: 'issue', component: ViewIssuesComponent, data: { state: '1' } },
      { path: 'fixed', component: ViewFixedComponent, data: { state: '2' } },
      { path: '**', redirectTo: 'usage' },
    ]
  },
  {
    path: 'stats', component: TmpStatsComponent,
    children: [
      { path: '', redirectTo: 'usage', pathMatch: 'full' },
      { path: 'usage', component: TmpStatsComponent, data: { state: '0' } },
      { path: 'issue', component: TmpStatsComponent, data: { state: '1' } },
      { path: 'fixed', component: TmpStatsComponent, data: { state: '2' } },
      { path: '**', redirectTo: 'usage' },
    ]
  },
  {
    path: 'docs', component: DocsComponent,
    children: [
      { path: '', redirectTo: 'safety', pathMatch: 'full' },
      { path: 'safety', component: SafetyDocsComponent, data: { state: '0' } },
      { path: 'parts', component: BoatPartsComponent, data: { state: '1' } },
      { path: '**', redirectTo: 'safety' },
    ]
  },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: 'report' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
