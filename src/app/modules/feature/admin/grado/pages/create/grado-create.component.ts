import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GradoService } from '@core/services/grado.service';
import { MessageService } from '@core/services/message.service';

@Component({
  selector: 'app-grado-create',
  templateUrl: './grado-create.component.html',
  styleUrls: ['./grado-create.component.scss']
})
export class GradoCreateComponent {

  isLoading = false;
  estados = ['Activo', 'Inactivo'];
  ordinales = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

  form = this.formBuilder.group({
    id: [uuidv4()],
    ordinal: [null, [Validators.required]],
    grado: [null, [Validators.required]],
    estado: [null, [Validators.required]]
  }); 

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private messageSvc: MessageService,
    private gradoSvc: GradoService
  ) {}

  async onSubmit() {
    if (this.form.invalid) return;

    const item = this.form.value;
    await this.gradoSvc.create(item);
    this.router.navigate(["/admin/grados"]);
    this.messageSvc.success();
  }

}