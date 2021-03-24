import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';

import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';

const Components = [
  ProductComponent,
  ProductListComponent
];

@NgModule({
  declarations: [Components],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ],
  exports: [Components]
})
export class ProductsModule { }
