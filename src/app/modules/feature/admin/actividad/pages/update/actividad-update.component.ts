import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { GrupoService } from '@core/services/grupo.service';
import { MessageService } from '@core/services/message.service';
import { ActividadService } from '@core/services/actividad.service';

@Component({
  selector: 'app-actividad-update',
  templateUrl: './actividad-update.component.html',
  styleUrls: ['./actividad-update.component.scss']
})
export class ActividadUpdateComponent implements OnInit {

  usuario: any;
  isLoading = false;
  grupos: any[] = [];
  estados = ['Activa', 'Inactiva'];

  form = this.formBuilder.group({
    id: [null],
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
    private activatedRoute: ActivatedRoute,
    private actividadService: ActividadService
  ) {
    this.getGrupos();
  }
  
  async ngOnInit(): Promise<void> {
    const actividadId = this.activatedRoute.snapshot.params["id"];
    const actividad = await this.actividadService.readbyId(actividadId);
    this.form.patchValue({ ...actividad });
  }

  private async getGrupos(): Promise<void> {
    this.grupos = await this.grupoSvc.read();
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;

    const actividad = this.form.value;
    await this.actividadService.update(actividad);
    this.router.navigate(["/admin/actividades"]);
    this.messageSvc.success("Registro actualizado exitosamente");
  }

}