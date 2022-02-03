import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActividadAdminComponent } from './pages/admin/actividad-admin.component';
import { ActividadCreateComponent } from './pages/create/actividad-create.component';
import { ActividadUpdateComponent } from './pages/update/actividad-update.component';

const routes: Routes = [
  { path: '', component: ActividadAdminComponent },
  { 
    path: 'crear', 
    data: { 
      title: 'Nueva actividad',
      breadcrumb: [
        { label: 'Dashboard', url: '/admin/dashboard'  },
        { label: 'Actividades', url: '/admin/actividades' },
        { label: 'Nueva actividad', url: '' }
      ]
    },
    component: ActividadCreateComponent
  },
  { 
    path: 'editar/:id', 
    data: { 
      title: 'Editar actividad',
      breadcrumb: [
        { label: 'Dashboard', url: '/admin/dashboard'  },
        { label: 'Actividades', url: '/admin/actividades' },
        { label: 'Editar actividad', url: '' }
      ]
    },
    component: ActividadUpdateComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ActividadRoutingModule { }