import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
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
  estados = ['Activa', 'Inactiva'];

  form = this.formBuilder.group({
    id: [null],
    descripcion: [null],
    titulo: [null, [Validators.required]],
    estado: [null, [Validators.required]]
  }); 

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private messageSvc: MessageService,
    private activatedRoute: ActivatedRoute,
    private actividadService: ActividadService
  ) {}
  
  async ngOnInit(): Promise<void> {
    const actividadId = this.activatedRoute.snapshot.params["id"];
    const actividad = await this.actividadService.readbyId(actividadId);
    this.form.patchValue({ ...actividad });
  }

  async onSubmit() {
    if (this.form.invalid) return;

    const actividad = this.form.value;
    await this.actividadService.update(actividad);
    this.router.navigate(["/admin/actividades"]);
    this.messageSvc.success("Registro actualizado exitosamente");
  }

}