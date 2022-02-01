import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss']
})
export class SubmenuComponent {
  
  @Input() submenu: any;
  
  onToggleSubmenu(item: any): void {
    this.submenu.isOpen = !this.submenu.isOpen;
  }

}