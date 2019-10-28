import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Import the sub-pages */
import { StatsAreaComponent } from './stats-area.component';
import { TmpStatsComponent } from './pages/tmp-stats/tmp-stats.component';

const routes: Routes = [
  {
    path: '',
    component: StatsAreaComponent,
    children: [
      { path: '', redirectTo: 'usage', pathMatch: 'full' },
      { path: 'usage', component: TmpStatsComponent, data: { state: '0' } },
      { path: 'issue', component: TmpStatsComponent, data: { state: '1' } },
      { path: 'fixed', component: TmpStatsComponent, data: { state: '2' } },
      { path: '**', redirectTo: 'usage' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatsAreaRoutingModule { }
