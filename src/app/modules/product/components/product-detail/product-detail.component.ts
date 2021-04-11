import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store, Select } from '@ngxs/store';
import { ProductState } from '../../states';

import { Product } from '../../models/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Select(ProductState.getProduct) product$: Observable<Product>;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
  }

}
