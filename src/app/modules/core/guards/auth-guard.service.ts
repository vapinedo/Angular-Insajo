import { Injectable } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authSvc: AuthService
  ) {}
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLogged = this.authSvc.isLogged();

    if (isLogged) { return true }
    
    this.router.navigate(["/auth"]);
    return false;
  }

}