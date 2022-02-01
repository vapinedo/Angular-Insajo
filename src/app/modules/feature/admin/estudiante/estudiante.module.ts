import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { EstudianteRoutingModule } from './estudiante-routing.module';

import { EstudianteDetailComponent } from './pages/detail/estudiante-detail.component';

const modules = [
  SharedModule,
  EstudianteRoutingModule
];

const components = [
  EstudianteDetailComponent
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [modules]
})
export class EstudianteModule { }
