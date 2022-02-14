import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@core/guards/auth-guard.service';
import { AdminGuardService } from '@core/guards/admin-guard.service';
import { AdminOrDocenteGuardService } from '@core/guards/admin-or-docente-guard.service';
import { AdminOrEstudianteGuardService } from '@core/guards/admin-or-estudiante-guard.service';

import { AdminLayoutComponent } from '@feature/admin/admin-layout.component';

const routes: Routes = [
  {
    path: 'auth',
    data: { title: 'Login' },
    loadChildren: () => import('@feature/auth/auth.module')
    .then(m => m.AuthModule)
  },
  {  
    path: 'admin', 
    component:  AdminLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {  
        path: 'dashboard',
        data: { 
          title: 'Dashboard',
          breadcrumb: [
            { label: 'Dashboard', url: '' },
          ]
        },
        loadChildren: () => import('@feature/admin/dashboard/dashboard.module')
        .then(m => m.DashboardModule)
      },
      {  
        path: 'usuarios',
        canActivate: [AdminGuardService],
        data: { 
          title: 'Usuarios',
          breadcrumb: [
            { label: 'Dashboard', url: '/admin/dashboard'  },
            { label: 'Usuarios', url: '' }
          ]
        },
        loadChildren: () => import('@feature/admin/usuario/usuario.module')
        .then(m => m.UsuarioModule)
      },
      {  
        path: 'docentes',
        canActivate: [AdminOrDocenteGuardService],
        data: { 
          title: 'Docentes',
          breadcrumb: [
            { label: 'Dashboard', url: '/admin/dashboard'  },
            { label: 'Docentes', url: '' },
          ]
        },
        loadChildren: () => import('@feature/admin/usuario/usuario.module')
        .then(m => m.UsuarioModule)
      },
      {  
        path: 'estudiantes',
        canActivate: [AdminOrEstudianteGuardService],
        data: { 
          title: 'Estudiantes',
          breadcrumb: [
            { label: 'Dashboard', url: '/admin/dashboard'  },
            { label: 'Estudiantes', url: '' },
          ]
        },
        loadChildren: () => import('@feature/admin/estudiante/estudiante.module')
        .then(m => m.EstudianteModule)
      },   
      {  
        path: 'actividades',
        canActivate: [AdminOrDocenteGuardService],
        data: { 
          title: 'Actividades',
          breadcrumb: [
            { label: 'Dashboard', url: '/admin/dashboard'  },
            { label: 'Actividades', url: '' },
          ]
        },
        loadChildren: () => import('@feature/admin/actividad/actividad.module')
        .then(m => m.ActividadModule)
      },   
      {  
        path: 'grados',
        canActivate: [AdminGuardService],
        data: { 
          title: 'Grados',
          breadcrumb: [
            { label: 'Dashboard', url: '/admin/dashboard'  },
            { label: 'Grados', url: '' },
          ]
        },
        loadChildren: () => import('@feature/admin/grado/grado.module')
        .then(m => m.GradoModule)
      },   
      {  
        path: 'grupos',
        canActivate: [AdminGuardService],
        data: { 
          title: 'Grupos',
          breadcrumb: [
            { label: 'Dashboard', url: '/admin/dashboard'  },
            { label: 'Grupos', url: '' },
          ]
        },
        loadChildren: () => import('@feature/admin/grupo/grupo.module')
        .then(m => m.GrupoModule)
      }   
    ]
  },
  { path: '**', redirectTo: '/admin/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
