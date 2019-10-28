import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Import the sub-pages */
import { ReportAreaComponent } from './report-area.component';
import { ReportUsageComponent } from './pages/report-usage/report-usage.component';
import { ReportIssueComponent } from './pages/report-issue/report-issue.component';
import { ReportIncidentComponent } from './pages/report-incident/report-incident.component';

const routes: Routes = [
  {
    path: '', component: ReportAreaComponent,
    children: [
      { path: '', redirectTo: 'usage', pathMatch: 'full' },
      { path: 'usage', component: ReportUsageComponent, data: { state: '0' } },
      { path: 'issue', component: ReportIssueComponent, data: { state: '1' } },
      { path: 'incident', component: ReportIncidentComponent, data: { state: '2' } },
      { path: '**', redirectTo: 'usage' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportAreaRoutingModule { }
