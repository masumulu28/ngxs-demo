import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ProductRoutingModule } from './product-routing.module';
import { NgxsModule } from '@ngxs/store';

import { ProductState } from './states/product.state';

import { ProductComponent } from './product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductAddComponent } from './components/product-add/product-add.component';


const Components = [
  ProductComponent,
  ProductListComponent,
  ProductDetailComponent,
  ProductAddComponent,
];

@NgModule({
  declarations: [Components],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ProductRoutingModule,
    NgxsModule.forFeature([
      ProductState
    ]),
  ],
  providers: [],
  exports: [Components]
})
export class ProductModule { }
