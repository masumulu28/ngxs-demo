import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, delay } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Product } from '../models/product';

import { Store } from '@ngxs/store';
import { ProductOccurError } from '../actions';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //#region Fields
  private readonly baseUrl: string = `${environment.apiUrl}products`;
  //#endregion

  //#region Utilities
  private handleError(err: HttpErrorResponse): Observable<any> {
    switch (err.status) {
      case 0:
        this.store.dispatch(new ProductOccurError(err.message));
        break;
      case 404:
        this.store.dispatch(new ProductOccurError(err.message));
        break;
      default: this.store.dispatch(new ProductOccurError('Server side error.')); break;
    }
    return throwError(err);
  }
  //#endregion

  //#region Ctor
  constructor(
    private store: Store,
    private http: HttpClient
  ) { }
  //#endregion

  //#region Methods
  getList = (): Observable<Product[]> =>
    this.http.get<Product[]>(this.baseUrl)
      .pipe(
        retry(3),
        delay(250),
        catchError(err => this.handleError(err))
      );

  get = (id: number): Observable<Product> =>
    this.http.get<Product>(`${this.baseUrl}/${id}`)
      .pipe(
        retry(3),
        delay(250),
        catchError(err => this.handleError(err))
      );

  add = (product: Product): Observable<Product> =>
    this.http.post<Product>(this.baseUrl, product)
      .pipe(
        catchError(err => this.handleError(err))
      );

  update = (product: Product): Observable<Product> =>
    this.http.put<Product>(`${this.baseUrl}/${product.id}`, product)
      .pipe(
        catchError(err => this.handleError(err))
      );

  delete = (id: number): Observable<void> =>
    this.http.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(err => this.handleError(err))
      );
  //#endregion
}
