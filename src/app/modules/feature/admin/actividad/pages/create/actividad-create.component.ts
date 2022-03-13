import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
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
export class ActividadCreateComponent implements OnInit {

  user: any;
  gruposList: any;
  isLoading = false;
  estados = ['Activa', 'Inactiva'];

  form = this.formBuilder.group({
    id: [uuidv4()],
    descripcion: [null],
    grupos: [null, [Validators.required]],
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
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = this.authSvc.getCurrentUser();
    const role = this.user.role.toLowerCase();

    if (role === "docente") {
      this.gruposList = await this.getGruposByUserId(this.user.id);
    } else if (role === "admin") {
      this.gruposList = await this.getGrupos();
    }
  }

  private async getGruposByUserId(id: string): Promise<void> {
    const { grupos } = await this.usuarioSvc.readbyId(id);
    return grupos;
  }

  private async getGrupos() {
    const grupoList = await this.grupoSvc.read();
    const nombreGrupoList = grupoList.map(item => item.nombre);
    return nombreGrupoList;
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;

    const item = this.form.value;

    item.creado_por = this.user.id;
    item.actualizado_por = this.user.id;
    item.fecha_creacion = new Date().getTime(),
    item.fecha_actualizacion = new Date().getTime()

    await this.actividadService.create(item);
    this.router.navigate(["/admin/actividades"]);
    this.messageSvc.success();
  }

}