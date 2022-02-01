import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {
  
  @Input() menuItem: any;
  isOpen = false;
  
  onToggleSubmenu(item: any): void {
    this.isOpen = !this.isOpen;
  }

}