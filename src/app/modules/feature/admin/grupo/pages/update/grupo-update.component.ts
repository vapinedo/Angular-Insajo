import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { GrupoService } from '@core/services/grupo.service';
import { MessageService } from '@core/services/message.service';

@Component({
  selector: 'app-grupo-update',
  templateUrl: './grupo-update.component.html',
  styleUrls: ['./grupo-update.component.scss']
})
export class GrupoUpdateComponent implements OnInit {

  usuario: any;
  isLoading = false;
  estados = ['Activo', 'Inactivo'];

  form = this.formBuilder.group({
    id: [null],
    grado: [null, [Validators.required]],
    ByteLengthQueuingStrategy: [null, [Validators.required]],
    estado: [null, [Validators.required]]
  }); 

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private messageSvc: MessageService,
    private activatedRoute: ActivatedRoute,
    private grupoService: GrupoService
  ) {}
  
  async ngOnInit(): Promise<void> {
    const grupoId = this.activatedRoute.snapshot.params["id"];
    const grupo = await this.grupoService.readbyId(grupoId);
    this.form.patchValue({ ...grupo });
  }

  async onSubmit() {
    if (this.form.invalid) return;

    const grupo = this.form.value;
    await this.grupoService.update(grupo);
    this.router.navigate(["/admin/grupos"]);
    this.messageSvc.success("Registro actualizado exitosamente");
  }

}