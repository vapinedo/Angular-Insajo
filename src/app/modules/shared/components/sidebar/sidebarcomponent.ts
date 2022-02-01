  import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { MessageService } from '@core/services/message.service';
import { SidebarService } from '@core/services/sidebar.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  
  @Input() sidebarIsClosed = false;
  
  private subscriptions = new SubSink();
  
  menu: any;
  title = 'Academic';
  currentUser: any;
  profileImage = '../../../../../assets/img/profile.jpg';
  
  constructor(
    private router: Router,
    private authSvc: AuthService,
    private sidebarSvc: SidebarService,
    private messageSvc: MessageService
  ) { 
    this._setMenu();
  }

  ngOnInit(): void {
    this.currentUser = this.authSvc.getCurrentUser();
  }

  private _setMenu() {
    this.subscriptions.add(
      this.sidebarSvc.getAll()
        .subscribe({
          next: data => {
              this.menu = data;
          },
          error: err => this.messageSvc.error(err)
        })
    );
  }
      
  onToggleSubmenu(item: any): void {
    console.log(item);
  }

  onLogout(): void {
    this.authSvc.logout();
    this.router.navigate(["/auth"]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}