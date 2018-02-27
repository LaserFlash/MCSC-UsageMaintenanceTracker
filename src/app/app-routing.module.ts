import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { ReportComponent } from './report/report.component';
import { ViewComponent } from './view/view.component';
import { StatsComponent } from './stats/stats.component';
import { DocsComponent } from './docs/docs.component';

const routes: Routes = [
  { path: '', redirectTo: '/report', pathMatch: 'full' },
  { path: 'report', component: ReportComponent },
  { path: 'view', component: ViewComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'docs', component: DocsComponent },
  { path: '**', redirectTo: '/report' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
