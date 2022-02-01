import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from '@feature/admin/admin-layout.component';
import { SidebarComponent } from '@shared/components/sidebar/sidebarcomponent';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubmenuComponent } from '@shared/components/submenu/submenu.component';
import { MenuItemComponent } from '@shared/components/menu-item/menu-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SubmenuComponent,
    MenuItemComponent,
    AdminLayoutComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
