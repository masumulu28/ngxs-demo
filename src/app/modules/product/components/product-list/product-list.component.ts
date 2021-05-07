import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Product } from '../../models/product';

import { Actions, ofAction, ofActionCanceled, ofActionCompleted, ofActionDispatched, ofActionSuccessful, Select, Store } from '@ngxs/store';
import { ProductState } from '../../states/product.state';
import { DeleteProduct, GetProduct, GetProducts } from '../../actions/product.actions';

import { ProductEditDialogComponent } from '../product-edit-dialog/product-edit-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  //#region Fields
  @Select(ProductState.getProducts) products$: Observable<Product[]>;

  readonly displayedColumns: string[] = ['id', 'name', 'quantity', 'price', 'actions'];
  //#endregion

  //#region Ctor
  constructor(
    private store: Store,
    private dialog: MatDialog
  ) { }
  //#endregion

  //#region Utilities
  private openDialog(): void {
    const config: MatDialogConfig = {
      minWidth: '25rem',
      panelClass: 'custom-dialog-container'
    };

    const dialogRef = this.dialog.open(ProductEditDialogComponent, config);

    dialogRef
      .afterClosed()
      .subscribe(response => {
        console.log(`Dialog result: ${response}`);
      });
  }
  //#endregion

  //#region Methods
  ngOnInit(): void {
    this.store.dispatch(new GetProducts());
  }

  detailOnClick(id: number): void {
    this.store.dispatch(new GetProduct(id));
  }

  editOnClick(id: number = 0): void {
    this.store.dispatch(new GetProduct(id));
    this.openDialog();
  }

  deleteOnClick(id: number): void {
    this.store.dispatch(new DeleteProduct(id));
  }
  //#endregion
}
