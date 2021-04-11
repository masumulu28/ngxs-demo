import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError, retry, delay } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Product } from '../models/product';

import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //#region Fields
  private baseUrl: string = `${environment.apiUrl}products`;
  //#endregion

  //#region Utilities
  handleError(err: any): Observable<any> {
    // this.store.dispatch(new RestOccurError(err));
    return throwError(err);
  }
  //#endregion

  //#region Ctor
  constructor(
    private store: Store,
    private httpClient: HttpClient
  ) { }
  //#endregion

  //#region Methods
  getList = (): Observable<Product[]> =>
    this.httpClient.get<Product[]>(this.baseUrl)
      .pipe(
        retry(3),
        delay(500),
        catchError(() => EMPTY)
      );

  get = (id: number): Observable<Product> =>
    this.httpClient.get<Product>(`${this.baseUrl}/${id}`)
      .pipe(
        retry(3),
        delay(500),
        catchError(() => EMPTY)
      );

  add = (product: Product): Observable<Product> =>
    this.httpClient.post<Product>(this.baseUrl, product);

  update = (product: Product): Observable<Product> =>
    this.httpClient.put<Product>(`${this.baseUrl}/${product.id}`, product);

  delete = (id: number): Observable<void> =>
    this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  //#endregion
}
