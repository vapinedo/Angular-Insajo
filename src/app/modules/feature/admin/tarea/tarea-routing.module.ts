import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TareaAdminComponent } from './pages/admin/tarea-admin.component';

const routes: Routes = [
  { path: '', component: TareaAdminComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class TareaRoutingModule { }