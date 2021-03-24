import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../modules/material/material.module';
import { PagesRoutingModule } from './pages-routing.module';

import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const components = [
  HomeComponent,
  NotFoundComponent
];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    MaterialModule,
    PagesRoutingModule
  ],
  exports: [components]
})
export class PagesModule { }
