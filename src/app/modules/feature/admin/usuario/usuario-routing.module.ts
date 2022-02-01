import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioAdminComponent } from './pages/admin/usuario-admin.component';
import { UsuarioCreateComponent } from './pages/create/usuario-create.component';
import { UsuarioUpdateComponent } from './pages/update/usuario-update.component';

const routes: Routes = [
  { path: '', component: UsuarioAdminComponent },
  { 
    path: 'crear', 
    data: { 
      title: 'Nuevo usuario',
      breadcrumb: [
        { label: 'Dashboard', url: '/admin/dashboard'  },
        { label: 'Usuarios', url: '/admin/usuarios' },
        { label: 'Nuevo usuario', url: '' }
      ]
    },
    component: UsuarioCreateComponent 
  },
  { 
    path: 'editar/:id', 
    data: { 
      title: 'Editar usuario',
      breadcrumb: [
        { label: 'Dashboard', url: '/admin/dashboard'  },
        { label: 'Usuarios', url: '/admin/usuarios' },
        { label: 'Editar usuario', url: '' }
      ]
    },
    component: UsuarioUpdateComponent 
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }