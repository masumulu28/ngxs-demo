import { Injectable } from '@angular/core';
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
  ProductOccurError,
} from '../actions/product.actions';
import { ToastrService } from 'ngx-toastr';

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
    private productService: ProductService,
    private toastrService: ToastrService
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
    const productFromState = ctx.getState().products.find(f => f.id === payload);

    return productFromState
      ? ctx.patchState({ product: productFromState })
      : this.productService.get(payload).pipe(
        tap(product =>
          ctx.patchState({
            product
          })
        ),
      );
  }

  @Action(AddProduct)
  addProduct(ctx: StateContext<ProductStateModel>, { payload }: AddProduct) {
    return this.productService.add(payload).pipe(
      tap((product) => {
        this.toastrService.success('Product added', 'Success');
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
        this.toastrService.success('Product updated', 'Success');
        const state = ctx.getState();
        ctx.patchState({
          ...state,
          products: [...state.products.filter(f => f.id !== product.id), product]
        });
      })
    );
  }

  @Action(DeleteProduct)
  deleteProduct(ctx: StateContext<ProductStateModel>, { payload }: DeleteProduct) {
    return this.productService.delete(payload).pipe(
      tap(() => {
        this.toastrService.info('Product deleted', 'Information');
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

  @Action(ProductOccurError)
  productOccurError(ctx: StateContext<ProductStateModel>, { payload }: ProductOccurError) {
    // console.log(payload)
    this.toastrService.error(payload, 'Error')
    ctx.setState({
      ...ctx.getState(),
      error: payload
    });
  }
  //#endregion
}
