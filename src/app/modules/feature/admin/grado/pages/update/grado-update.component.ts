import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { GradoService } from '@core/services/grado.service';
import { MessageService } from '@core/services/message.service';

@Component({
  selector: 'app-grado-update',
  templateUrl: './grado-update.component.html',
  styleUrls: ['./grado-update.component.scss']
})
export class GradoUpdateComponent implements OnInit {

  isLoading = false;
  estados = ['Activo', 'Inactivo'];
  ordinales = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

  form = this.formBuilder.group({
    id: [null],
    ordinal: [null, [Validators.required]],
    grado: [null, [Validators.required]],
    estado: [null, [Validators.required]]
  }); 

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private messageSvc: MessageService,
    private activatedRoute: ActivatedRoute,
    private gradoSvc: GradoService
  ) {}
  
  async ngOnInit(): Promise<void> {
    const id = this.activatedRoute.snapshot.params["id"];
    const formData = await this.gradoSvc.readbyId(id);
    this.form.patchValue({ ...formData });
  }

  async onSubmit() {
    if (this.form.invalid) return;

    const item = this.form.value;
    await this.gradoSvc.update(item);
    this.router.navigate(["/admin/grados"]);
    this.messageSvc.success("Registro actualizado exitosamente");
  }

}