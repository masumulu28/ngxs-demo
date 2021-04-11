import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product';
import { Store } from '@ngxs/store';
import { AddProduct } from '../../actions/product.actions';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  //#region 
  productForm: FormGroup;
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

  //#region  Methods
  ngOnInit(): void {
    this.buildForm();
  }

  addProduct(): void {
    this.store.dispatch(new AddProduct(this.productForm.value as Product));
  }
  //#endregion
}
