import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GrupoService } from '@core/services/grupo.service';
import { UsuarioService } from '@core/services/usuario.service';
import { MessageService } from '@core/services/message.service';
import { ValidatorsService } from '@core/services/validators.service';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.scss']
})
export class UsuarioCreateComponent {

  isLoading = false;
  grupos: string[] = [];
  roles = ['Administrador', 'Docente', 'Estudiante']; 
  estados = ['Activo', 'Inactivo', 'Temporalmente Suspendido', 'De Vacaciones'];

  form = this.formBuilder.group({
    id: [uuidv4()],
    role: [null, [Validators.required]],
    grupos: [null],
    estado: [null, [Validators.required]],
    email: [null, [
      Validators.required,
      Validators.pattern(this.validatorsSvc.VALID_EMAIL_STRING)
    ]],
    nombres: [null, [
      Validators.required,
      Validators.minLength(3)
    ]],
    password: [null, [Validators.required]],
    apellidos: [null, [
      Validators.required,
      Validators.minLength(2)
    ]]
  }); 

  constructor(
    private router: Router,
    private grupoSvc: GrupoService,
    private formBuilder: FormBuilder,
    private messageSvc: MessageService,
    private usuarioSvc: UsuarioService,
    private validatorsSvc: ValidatorsService,
  ) {
    this.getGrupos();
  }

  private async getGrupos(): Promise<void> {
    const grupoListo = await this.grupoSvc.read();
    const nombreGrupoList = grupoListo.map(item => item.nombre);
    this.grupos = nombreGrupoList;
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;

    const item = this.form.value;
    await this.usuarioSvc.create(item);
    this.router.navigate(["/admin/usuarios"]);
    this.messageSvc.success();
  }

}