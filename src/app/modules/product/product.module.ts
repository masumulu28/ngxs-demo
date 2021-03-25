import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';

import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';

const Components = [
  ProductComponent,
  ProductListComponent
];

@NgModule({
  declarations: [Components],
  imports: [
    CommonModule,
    ProductRoutingModule
  ],
  exports: [Components]
})
export class ProductModule { }
