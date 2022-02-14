import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GrupoService } from '@core/services/grupo.service';
import { MessageService } from '@core/services/message.service';

@Component({
  selector: 'app-grupo-create',
  templateUrl: './grupo-create.component.html',
  styleUrls: ['./grupo-create.component.scss']
})
export class GrupoCreateComponent {

  isLoading = false;
  estados = ['Activo', 'Inactivo'];

  form = this.formBuilder.group({
    id: [uuidv4()],
    grado: [null, [Validators.required]],
    letra: [null, [Validators.required]],
    estado: [null, [Validators.required]]
  }); 

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private messageSvc: MessageService,
    private grupoService: GrupoService
  ) {}

  async onSubmit() {
    if (this.form.invalid) return;

    const actividad = this.form.value;
    await this.grupoService.create(actividad);
    this.router.navigate(["/admin/grupos"]);
    this.messageSvc.success();
  }

}