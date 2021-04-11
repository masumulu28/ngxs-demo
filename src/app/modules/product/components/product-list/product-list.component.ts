import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../../models/product';

import { Actions, ofAction, ofActionCanceled, ofActionCompleted, ofActionDispatched, ofActionSuccessful, Select, Store } from '@ngxs/store';
import { ProductState } from '../../states/product.state';
import { DeleteProduct, GetProduct, GetProducts } from '../../actions/product.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  //#region Fields
  @Select(ProductState.getProducts)
  products$: Observable<Product[]>;

  displayedColumns: string[] = ['id', 'name', 'quantity', 'price', 'actions'];

  //#endregion

  //#region Ctor
  constructor(
    private store: Store
  ) { }
  //#endregion

  //#region Methods
  ngOnInit(): void {
    this.store.dispatch(new GetProducts());
  }

  detailOnClick(id: number): void {
    this.store.dispatch(new GetProduct(id));
  }

  deleteOnClick(id: number): void {
    this.store.dispatch(new DeleteProduct(id));
  }
  //#endregion
}
