import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import {
  GetProducts,
  GetProduct,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
  ClearProduct,
} from '../actions/product.actions';

/*
  https://github.com/abpframework/abp/tree/dev/npm/ng-packs/packages/core/src/lib => Klasörleme yapısını incele

  https://medium.com/ngxs-stories/state-as-a-service-with-ngxs-%EF%B8%8F-97e7de8ec072 => Makaleyi oku
*/
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
        catchError(() => EMPTY)
      ),
    );
  }

  @Action(AddProduct)
  addProduct(ctx: StateContext<ProductStateModel>, { payload }: AddProduct) {
    return this.productService.add(payload).pipe(
      tap((product) => {
        const state = ctx.getState();
        ctx.patchState({
          ...state,
          products: [...state.products, product]
        });
      })
    );
  }

  @Action(UpdateProduct)
  updateProduct(ctx: StateContext<ProductStateModel>, { payload }: UpdateProduct) {
    return this.productService.update(payload).pipe(
      tap((product) => {
        const state = ctx.getState();
        ctx.patchState({
          ...state,
          products: [...state.products, product]
        });
      })
    );
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

  @Action(ClearProduct)
  clearProduct(ctx: StateContext<ProductStateModel>) {
    ctx.setState({
      ...ctx.getState(),
      product: null
    });
  }
  //#endregion
}
