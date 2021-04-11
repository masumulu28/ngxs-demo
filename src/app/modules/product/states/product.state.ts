import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import {
  GetProducts,
  GetProduct,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
} from '../actions/product.actions';


export class ProductStateModel {
  public products: Product[];
  public product?: Product;
  public error: any;
}

const PRODUCT_STATE_TOKEN = new StateToken<ProductStateModel>('product');

@State<ProductStateModel>({
  name: PRODUCT_STATE_TOKEN,
  defaults: { products: [], product: null, error: null } as ProductStateModel
})
@Injectable()
export class ProductState {
  //#region Selectors
  @Selector()
  static getProducts(state: ProductStateModel): Product[] {
    return state.products || [];
  }

  @Selector()
  static getProduct(state: ProductStateModel): Product {
    return state.product || null;
  }
  //#endregion

  //#region  Ctor
  constructor(
    private productService: ProductService
  ) { }
  //#endregion

  //#region Actions
  @Action(GetProducts)
  loadProducts(ctx: StateContext<ProductStateModel>) {
    return this.productService.getList().pipe(
      tap(products => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          products
        })
      }),
    );
  }

  @Action(GetProduct)
  loadProduct(ctx: StateContext<ProductStateModel>, { payload }: GetProduct) {
    return this.productService.get(payload).pipe(
      tap(product =>
        ctx.patchState({
          product
        }),
      ),
    );
  }

  @Action(AddProduct)
  addProduct(ctx: StateContext<ProductStateModel>, { payload }: AddProduct) {
    this.productService.add(payload).pipe(
      tap((product) => {
        const state = ctx.getState();
        ctx.patchState({
          products: [...state.products, product]
        });
      })
    );

  }

  @Action(UpdateProduct)
  updateProduct(ctx: StateContext<ProductStateModel>, { payload }: UpdateProduct) {
    const state = ctx.getState();
    ctx.patchState({
      products: [...state.products, payload]
    });
  }

  @Action(DeleteProduct)
  deleteProduct(ctx: StateContext<ProductStateModel>, { payload }: DeleteProduct) {
    return this.productService.delete(payload).pipe(
      tap(() => {
        const state = ctx.getState();
        ctx.patchState({
          ...state,
          products: state.products.filter(
            f => f.id !== payload
          )
        });
      })
    );
  }
  //#endregion
}
