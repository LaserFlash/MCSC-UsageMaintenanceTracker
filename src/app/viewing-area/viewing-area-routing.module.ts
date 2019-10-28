import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Import the sub-pages */
import { ViewingAreaComponent } from './viewing-area.component';
import { ViewUsageComponent } from './pages/view-usage/view-usage.component';
import { ViewIssuesComponent } from './pages/view-issues/view-issues.component';
import { ViewFixedComponent } from './pages/view-fixed/view-fixed.component';


const routes: Routes = [
  {
    path: '', component: ViewingAreaComponent,
    children: [
      { path: '', redirectTo: 'usage', pathMatch: 'full' },
      { path: 'usage', component: ViewUsageComponent, data: { state: '0' } },
      { path: 'issue', component: ViewIssuesComponent, data: { state: '1' } },
      { path: 'fixed', component: ViewFixedComponent, data: { state: '2' } },
      { path: '**', redirectTo: 'usage' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewingAreaRoutingModule { }
