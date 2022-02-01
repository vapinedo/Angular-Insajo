import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocenteDetailComponent } from './pages/detail/docente-detail.component';

const routes: Routes = [
  { path: '', component: DocenteDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class DocenteRoutingModule { }