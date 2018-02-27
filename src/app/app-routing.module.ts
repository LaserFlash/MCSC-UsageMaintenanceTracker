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

import { StatsComponent } from './view-stats/stats.component'
import { TmpStatsComponent } from './view-stats/tmp-stats/tmp-stats.component';

import { DocsComponent } from './view-docs/docs.component';
import { BoatPartsComponent } from './view-docs/boat-parts/boat-parts.component';
import { SafetyDocsComponent } from './view-docs/safety-docs/safety-docs.component';


const routes: Routes = [
  { path: '', redirectTo: 'report', pathMatch: 'full'},
  { path: 'report', component: ReportComponent,
    children: [
      { path: '', redirectTo: 'usage', pathMatch: 'full'},
      { path: 'usage', component: ReportUsageComponent},
      { path: 'issue', component: ReportIssueComponent},
      { path: 'incident', component: ReportIncidentComponent},
      { path: '**', redirectTo: '' },
    ]
},
  { path: 'view', component: ViewComponent,
  children: [
    { path: '', redirectTo: 'usage', pathMatch: 'full'},
    { path: 'usage', component: ViewUsageComponent},
    { path: 'issue', component: ViewIssuesComponent},
    { path: 'fixed', component: ViewFixedComponent},
    { path: '**', redirectTo: '' },
  ]
},
  { path: 'stats', component: StatsComponent,
  children: [
    { path: '', redirectTo: 'dev', pathMatch: 'full'},
    { path: 'dev', component: TmpStatsComponent},
    { path: 'usage', component: TmpStatsComponent},
    { path: 'issue', redirectTo: 'dev'},
    { path: 'fixed', redirectTo: 'dev'},
    { path: '**', redirectTo: ''},
  ]
},
  { path: 'docs', component: DocsComponent,
  children: [
    { path: '', redirectTo: 'safety', pathMatch: 'full'},
    { path: 'safety', component: SafetyDocsComponent},
    { path: 'parts', component: BoatPartsComponent },
    { path: '**', redirectTo: ''},
  ]
},
  { path: '**', redirectTo: 'report'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
