import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Import the sub-pages */
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAreaRoutingModule { }
