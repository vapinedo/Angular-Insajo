import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { GrupoService } from '@core/services/grupo.service';
import { MessageService } from '@core/services/message.service';
import { UsuarioService } from '@core/services/usuario.service';
import { StorageService } from '@core/services/storage.service';
import { ActividadService } from '@core/services/actividad.service';

@Component({
  selector: 'app-actividad-create',
  templateUrl: './actividad-create.component.html',
  styleUrls: ['./actividad-create.component.scss']
})
export class ActividadCreateComponent {

  user: any;
  isLoading = false;
  grupos: string[] = [];
  estados = ['Activa', 'Inactiva'];

  form = this.formBuilder.group({
    id: [uuidv4()],
    descripcion: [null],
    grupo: [null, [Validators.required]],
    titulo: [null, [Validators.required]],
    estado: [null, [Validators.required]],
    creado_por: [null],
    fecha_creacion: [null],
    actualizado_por: [null],
    fecha_actualizacion: [null]
  }); 

  constructor(
    private router: Router,
    private authSvc: AuthService,
    private grupoSvc: GrupoService,
    private formBuilder: FormBuilder,
    private messageSvc: MessageService,
    private usuarioSvc: UsuarioService,
    private storageSvc: StorageService,
    private actividadService: ActividadService
  ) {
    this.user = storageSvc.read("user");

    if (this.user && this.user?.role === "Docente") {
      this.getGruposByUserId(this.user);
    } 
    else if (this.user && this.user?.role === "Admin") {
      this.getGrupos(); 
    }
  }

  private async getGruposByUserId(user: any): Promise<void> {
    const data = await this.usuarioSvc.readbyId(user.id);
    console.log(data);
  }

  private async getGrupos(): Promise<void> {
    const grupoListo = await this.grupoSvc.read();
    const nombreGrupoList = grupoListo.map(item => item.nombre);
    this.grupos = nombreGrupoList;
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;

    const actividad = this.form.value;
    actividad.creado_por = this.user.id;
    actividad.actualizado_por = this.user.id;
    actividad.fecha_creacion = new Date().getTime(),
    actividad.fecha_actualizacion = new Date().getTime()

    await this.actividadService.create(actividad);
    this.router.navigate(["/admin/actividades"]);
    this.messageSvc.success();
  }

}