import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';

import { HomeComponent } from './home/home.component';

const components = [
  HomeComponent
];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
  exports: [components]
})
export class PagesModule { }
