import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { GradoService } from '@core/services/grado.service';
import { GrupoService } from '@core/services/grupo.service';
import { MessageService } from '@core/services/message.service';

@Component({
  selector: 'app-grupo-update',
  templateUrl: './grupo-update.component.html',
  styleUrls: ['./grupo-update.component.scss']
})
export class GrupoUpdateComponent implements OnInit {

  isLoading = false;
  grados: any[] = [];
  estados = ['Activo', 'Inactivo'];
  letras = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

  form = this.formBuilder.group({
    id: [null],
    nombre: [null],
    grado: [null, [Validators.required]],
    letra: [null, [Validators.required]],
    estado: [null, [Validators.required]]
  }); 

  constructor(
    private router: Router,
    private gradoSvc: GradoService,
    private formBuilder: FormBuilder,
    private messageSvc: MessageService,
    private grupoService: GrupoService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.getGrados();
  }
  
  async ngOnInit(): Promise<void> {
    const grupoId = this.activatedRoute.snapshot.params["id"];
    const grupo = await this.grupoService.readbyId(grupoId);
    this.form.patchValue({ ...grupo });
  }

  private async getGrados(): Promise<void> {
    this.grados = await this.gradoSvc.read();
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;

    const item = this.form.value;
    item.nombre = `${item.grado} ${item.letra}`;

    await this.grupoService.update(item);
    this.router.navigate(["/admin/grupos"]);
    this.messageSvc.success("Registro actualizado exitosamente");
  }

}