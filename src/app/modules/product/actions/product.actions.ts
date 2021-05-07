import { Product } from "../models/product";

export class GetProducts {
  static readonly type = '[Product] Get Products';
}

export class GetProduct {
  static readonly type = '[Product] Get Product';
  constructor(public payload: number) { }
}

export class AddProduct {
  static readonly type = '[Product] Add Product';
  constructor(public payload: Product) { }
}

export class UpdateProduct {
  static readonly type = '[Product] Update Product';
  constructor(public payload: Product) { }
}

export class DeleteProduct {
  static readonly type = '[Product] Delete Product';
  constructor(public payload: number) { }
}

export class ClearProduct {
  static readonly type = '[Product] Clear Product';
}