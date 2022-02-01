import { Injectable } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable()
export class AdminGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authSvc: AuthService
  ) {}
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const role = this.authSvc.getRole();

    if (role?.toLowerCase() === "admin") { return true } 
    
    this.router.navigate(["/admin/dashboard"]);
    return false;
  }

}