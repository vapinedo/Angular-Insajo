import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '@core/services/usuario.service';
import { MessageService } from '@core/services/message.service';
import { ValidatorsService } from '@core/services/validators.service';

@Component({
  selector: 'app-usuario-update',
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.scss']
})
export class UsuarioUpdateComponent implements OnInit {

  usuario: any;
  isLoading = false;
  roles = ['Administrador', 'Docente', 'Estudiante']; 
  estados = ['Activo', 'Inactivo', 'Temporalmente Suspendido', 'De Vacaciones'];

  form = this.formBuilder.group({
    id: [null],
    role: [null, [Validators.required]],
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
    apellidos: [null, [Validators.required]]
  }); 

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioSvc: UsuarioService,
    private messageSvc: MessageService,
    private activatedRoute: ActivatedRoute,
    private validatorsSvc: ValidatorsService,
  ) {}
  
  async ngOnInit(): Promise<void> {
    const usuarioId = this.activatedRoute.snapshot.params["id"];
    const usuario = await this.usuarioSvc.readbyId(usuarioId);
    this.form.patchValue({ ...usuario });
  }

  async onSubmit() {
    if (this.form.invalid) return;

    const usuario = this.form.value;
    await this.usuarioSvc.update(usuario);
    this.router.navigate(["/admin/usuarios"]);
    this.messageSvc.success("Registro actualizado exitosamente");
  }

}