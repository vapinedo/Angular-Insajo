import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { MessageService } from '@core/services/message.service';
import { ValidatorsService } from '@core/services/validators.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  authError = false;
  title = 'Academic - Admin';
  logo = "../../../../../../../assets/img/logo.jpeg";

  form = this.formBuilder.group({
    email: [null, [
      Validators.required,
      Validators.pattern(this.validatorsSvc.VALID_EMAIL_STRING)
    ]],
    password: [null, [Validators.required]]
  }); 

  constructor( 
    private router: Router,
    private authSvc: AuthService,
    private formBuilder: FormBuilder,
    private messageSvc: MessageService,
    private validatorsSvc: ValidatorsService,
  ) { }

  async onSubmit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;
    const isLogged = await this.authSvc.login(email, password);

    if (isLogged) {
      this.router.navigate(["/admin/usuarios"]);
    } else {
      this.messageSvc.errorSwal("Email o contraseña inválidos");
    }
  }

}