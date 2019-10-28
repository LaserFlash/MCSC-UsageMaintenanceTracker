import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Import the sub-pages */
import { DocumentAreaComponent } from './document-area.component';
import { SafetyDocsComponent } from './pages/safety-docs/safety-docs.component';
import { BoatPartsComponent } from './pages/boat-parts/boat-parts.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentAreaComponent,
    children: [
      {path: '', redirectTo: 'safety', pathMatch: 'full'},
      { path: 'safety', component: SafetyDocsComponent, data: { state: '0' }  },
      { path: 'parts', component: BoatPartsComponent, data: { state: '1' } },
      { path: '**', redirectTo: 'safety' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentAreaRoutingModule { }
