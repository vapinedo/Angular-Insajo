import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { SidebarService } from '@core/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  @Input() sidebarIsClosed = false;
  
  menu: any;
  currentUser: any;
  title = 'Academic App';
  profileImage = '../../../../../assets/img/profile.jpg';
  
  constructor(
    private router: Router,
    private authSvc: AuthService,
    private sidebarSvc: SidebarService
  ) { 
    this.getMenu();
  }

  ngOnInit(): void {
    this.currentUser = this.authSvc.getCurrentUser();
  }

  async getMenu() {
    const menu = await this.sidebarSvc.getMenu();
    const userRole = this.authSvc.getRole()?.toLowerCase();
    const menuMatchRole = menu.filter(item => item.roles.includes(userRole));
    this.menu = menuMatchRole;
  }
      
  onToggleSubmenu(item: any): void {
    console.log(item);
  }

  onLogout(): void {
    this.authSvc.logout();
    this.router.navigate(["/auth"]);
  }
}