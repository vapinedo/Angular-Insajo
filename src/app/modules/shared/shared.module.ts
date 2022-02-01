import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@custom/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { NotResultComponent } from './components/not-result/not-result.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

import { DialogComponent } from './components/dialog/dialog.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';

const components = [
  DialogComponent,
  SpinnerComponent,
  NotResultComponent,
  BreadcrumbsComponent,
  FileUploaderComponent
];

const modules = [
  CommonModule,
  RouterModule,
  ToastrModule,
  MaterialModule,
  FormsModule,
  ReactiveFormsModule,
  NgDynamicBreadcrumbModule,
  NgxMaskModule .forRoot({
    showMaskTyped: false,
    dropSpecialCharacters: false
  }),
  ToastrModule.forRoot({
    maxOpened: 3,
    timeOut: 7000,
    autoDismiss: true,
    preventDuplicates: true,
    positionClass: 'toast-top-right'
  })
];

@NgModule({
  declarations: [components],
  imports: [modules],
  exports: [modules, components]
})
export class SharedModule { }