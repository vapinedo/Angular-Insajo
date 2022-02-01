import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './pages/dashboard/dashboard.component';

const modules = [
  SharedModule,
  SharedModule,
  DashboardRoutingModule
];

const components = [
  DashboardComponent,
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [modules]
})
export class DashboardModule { }
