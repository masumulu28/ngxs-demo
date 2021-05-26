import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { MatDialogRef } from '@angular/material/dialog';

import { Select, Store } from '@ngxs/store';
import { ProductState } from '../../states';
import { UpdateProduct, ClearProduct, AddProduct } from '../../actions';

import { Product } from '../../models/product';

@Component({
  selector: 'app-product-edit-dialog',
  templateUrl: './product-edit-dialog.component.html',
  styleUrls: ['./product-edit-dialog.component.scss']
})
export class ProductEditDialogComponent implements OnInit, OnDestroy {
  //#region Fields
  subscription: Subscription;
  title: string = 'Edit Product';
  color: string = 'primary';
  productForm: FormGroup;

  @Select(ProductState.getProduct) product$: Observable<Product>;
  //#endregion

  //#region Utilities
  private buildProductForm(): void {
    this.subscription = this.product$
      //.pipe(filter((product, index) => !!product)) //get product if is not null
      .subscribe(product => {
        this.productForm = this.fb.group({
          'id': product?.id ?? 0,
          'name': product?.name ?? '',
          'quantity': product?.quantity ?? 0,
          'price': product?.price ?? 0
        });
      });
  }
  //#endregion

  //#region Ctor
  constructor(
    private store: Store,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductEditDialogComponent>
  ) { }
  //#endregion

  //#region Methods
  ngOnInit(): void {
    this.buildProductForm();
  }

  saveOnClick(): void {
    const _product = this.productForm.value as Product;
    this.subscription.add(this
      .store
      .dispatch(_product.id > 0 ? new UpdateProduct(_product) : new AddProduct(_product))
      .subscribe(() => this.dialogRef.close()));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ClearProduct());
    this.subscription.unsubscribe();
  }
  //#endregion
}
