import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { Select } from '@ngxs/store';
import { ProductState } from '../../states';

import { Product } from '../../models/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  //#region Fields
  @Select(ProductState.getProduct) product$: Observable<Product>;
  productForm: FormGroup;
  //#endregion

  //#region Utilities

  //#endregion

  //#region Ctor
  constructor(
    private fb: FormBuilder
  ) { }
  //#endregion

  //#region Methods
  ngOnInit(): void {
    this.product$.subscribe(
      product => {
        if (product != null) {
          this.productForm = this.fb.group({
            'name': product.name,
            'quantity': product.quantity,
            'price': product.price
          });
        }
      }
    );
  }

  ngOnDestroy(): void {

  }
  //#endregion
}
