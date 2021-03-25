import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //#region Fields
  private baseUrl: string = `${environment.apiUrl}products`;
  //#endregion

  //#region  Ctor
  constructor(
    private httpClient: HttpClient
  ) { }
  //#endregion

  //#region Methods
  getList = (): Observable<Product[]> => this.httpClient.get<Product[]>(this.baseUrl);
  //#endregion
}
