import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstudianteDetailComponent } from './pages/detail/estudiante-detail.component';

const routes: Routes = [
  { path: '', component: EstudianteDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class EstudianteRoutingModule { }