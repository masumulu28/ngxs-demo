import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../modules/material/material.module";

import { NavComponent } from './components/nav/nav.component';

const Components = [
  NavComponent
];

@NgModule({
  declarations: [Components],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [Components]
})
export class SharedModule { }
