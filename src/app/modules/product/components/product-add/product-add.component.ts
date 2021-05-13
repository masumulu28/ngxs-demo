import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Product } from '../../models/product';

import { Store } from '@ngxs/store';
import { AddProduct } from '../../actions/product.actions';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit, OnDestroy {
  //#region Fields
  subscription: Subscription;
  productForm: FormGroup;
  @Input() showTitle: boolean = true;
  //#endregion

  //#region Utilities
  private buildForm(): void {
    this.productForm = this.fb.group({
      'id': [0],
      'name': ['', Validators.required],
      'quantity': [0, [Validators.required, Validators.min(1)]],
      'price': [0, [Validators.required, Validators.min(1)]],
      'imageUrl': ['']
    });
  }
  //#endregion

  //#region Ctor
  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) { }
  //#endregion

  //#region Methods
  ngOnInit(): void {
    this.buildForm();
  }

  addProductOnClick(): void {
    this.subscription = this.store
      .dispatch(new AddProduct(this.productForm.value as Product))
      .subscribe(() => this.productForm.reset());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  //#endregion
}
