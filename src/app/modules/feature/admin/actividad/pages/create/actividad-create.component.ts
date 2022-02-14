import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GrupoService } from '@core/services/grupo.service';
import { MessageService } from '@core/services/message.service';
import { ActividadService } from '@core/services/actividad.service';

@Component({
  selector: 'app-actividad-create',
  templateUrl: './actividad-create.component.html',
  styleUrls: ['./actividad-create.component.scss']
})
export class ActividadCreateComponent {

  isLoading = false;
  grupos: any[] = [];
  estados = ['Activa', 'Inactiva'];

  form = this.formBuilder.group({
    id: [uuidv4()],
    descripcion: [null],
    grupo: [null, [Validators.required]],
    titulo: [null, [Validators.required]],
    estado: [null, [Validators.required]]
  }); 

  constructor(
    private router: Router,
    private grupoSvc: GrupoService,
    private formBuilder: FormBuilder,
    private messageSvc: MessageService,
    private actividadService: ActividadService
  ) {
    this.getGrupos();
  }

  private async getGrupos(): Promise<void> {
    this.grupos = await this.grupoSvc.read();
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;

    const actividad = this.form.value;
    await this.actividadService.create(actividad);
    this.router.navigate(["/admin/actividades"]);
    this.messageSvc.success();
  }

}