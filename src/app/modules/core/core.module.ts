import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AuthGuardService } from './guards/auth-guard.service';
import { AdminGuardService } from './guards/admin-guard.service';
import { EstudianteGuardService } from './guards/estudiante-guard.service';
import { AdminOrDocenteGuardService } from './guards/admin-or-docente-guard.service';
import { AdminOrEstudianteGuardService } from './guards/admin-or-estudiante-guard.service';

import { AuthService } from './services/auth.service';
import { GradoService } from './services/grado.service';
import { TareaService } from './services/tarea.service';
import { GrupoService } from './services/grupo.service';
import { MessageService } from './services/message.service';
import { SidebarService } from './services/sidebar.service';
import { HelpersService } from './services/helpers.service';
import { StorageService } from './services/storage.service';
import { UsuarioService } from './services/usuario.service';
import { DatetimeService } from './services/datetime.service';
import { ActividadService } from './services/actividad.service';
import { ValidatorsService } from './services/validators.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    AuthService,
    TareaService,
    GrupoService,
    GradoService,
    UsuarioService,
    HelpersService,
    MessageService,
    SidebarService,
    StorageService,
    DatetimeService,
    ActividadService,
    AuthGuardService,
    AdminGuardService,
    ValidatorsService,
    EstudianteGuardService,
    AdminOrDocenteGuardService,
    AdminOrEstudianteGuardService,
  ]
})
export class CoreModule { }
