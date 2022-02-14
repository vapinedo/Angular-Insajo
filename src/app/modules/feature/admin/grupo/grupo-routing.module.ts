import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrupoAdminComponent } from './pages/admin/grupo-admin.component';
import { GrupoCreateComponent } from './pages/create/grupo-create.component';
import { GrupoUpdateComponent } from './pages/update/grupo-update.component';

const routes: Routes = [
  { path: '', component: GrupoAdminComponent },
  { 
    path: 'crear', 
    data: { 
      title: 'Nuevo grupo',
      breadcrumb: [
        { label: 'Dashboard', url: '/admin/dashboard'  },
        { label: 'Grupos', url: '/admin/grupos' },
        { label: 'Nuevo grupo', url: '' }
      ]
    },
    component: GrupoCreateComponent
  },
  { 
    path: 'editar/:id', 
    data: { 
      title: 'Editar grupo',
      breadcrumb: [
        { label: 'Dashboard', url: '/admin/dashboard'  },
        { label: 'Grupos', url: '/admin/grupos' },
        { label: 'Editar grupo', url: '' }
      ]
    },
    component: GrupoUpdateComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class GrupoRoutingModule { }