import { Injectable } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { MessageService } from '@core/services/message.service';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authSvc: AuthService,
    private messageService: MessageService
  ) {}
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const userState = this.authSvc.getEstado()?.toLowerCase();
    const isLogged = this.authSvc.isLogged();

    if (isLogged && userState === "activo") { return true }

    this.router.navigate(["/auth"]);
    this.messageService.error("Tu cuenta está inactiva o suspedida. Comuníquese con el administrador del sistema");
    return false;
  }

}