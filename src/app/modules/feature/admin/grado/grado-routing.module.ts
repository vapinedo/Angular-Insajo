import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GradoAdminComponent } from '@feature/admin/grado/pages/admin/grado-admin.component';
import { GradoCreateComponent } from '@feature/admin/grado/pages/create/grado-create.component';
import { GradoUpdateComponent } from '@feature/admin/grado/pages/update/grado-update.component';

const routes: Routes = [
  { path: '', component: GradoAdminComponent },
  { 
    path: 'crear', 
    data: { 
      title: 'Nuevo grado',
      breadcrumb: [
        { label: 'Dashboard', url: '/admin/dashboard'  },
        { label: 'Grados', url: '/admin/grados' },
        { label: 'Nuevo grado', url: '' }
      ]
    },
    component: GradoCreateComponent
  },
  { 
    path: 'editar/:id', 
    data: { 
      title: 'Editar grado',
      breadcrumb: [
        { label: 'Dashboard', url: '/admin/dashboard'  },
        { label: 'Grados', url: '/admin/grados' },
        { label: 'Editar grado', url: '' }
      ]
    },
    component: GradoUpdateComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class GradoRoutingModule { }