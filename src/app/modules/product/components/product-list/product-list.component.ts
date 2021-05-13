import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Product } from '../../models/product';

import { Select, Store } from '@ngxs/store';
import { ProductState } from '../../states/product.state';
import { DeleteProduct, GetProduct, GetProducts } from '../../actions/product.actions';

import { ProductEditDialogComponent } from '../product-edit-dialog/product-edit-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  //#region Fields
  subscription: Subscription;
  color = 'primary';
  readonly displayedColumns: string[] = ['id', 'name', 'quantity', 'price', 'actions'];

  @Select(ProductState.getProducts) products$: Observable<Product[]>;
  dataSource = new MatTableDataSource<Product>([]);
  isAdd: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  //#endregion

  //#region Ctor
  constructor(
    private store: Store,
    private dialog: MatDialog
  ) { }
  //#endregion

  //#region Utilities
  private loadProducts(): void {
    this.store.dispatch(new GetProducts());
    this.subscription = this.products$.subscribe(response => this.dataSource.data = response);
  }

  private openDialog(): void {
    const config: MatDialogConfig = {
      minWidth: '25rem',
      panelClass: 'custom-dialog-container',
    };

    const dialogRef = this.dialog.open(ProductEditDialogComponent, config);

    this.subscription.add(dialogRef
      .afterClosed()
      .subscribe(response => {
        console.log(`Dialog result: ${response}`);
      }));
  }
  //#endregion

  //#region Methods
  ngOnInit(): void {
    this.loadProducts();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  detailOnClick(id: number): void {
    this.store.dispatch(new GetProduct(id));
  }

  editOnClick(id: number = 0): void {
    if (id < 1) this.isAdd = !this.isAdd;
    else {
      this.store.dispatch(new GetProduct(id));
      this.openDialog();
    }
  }

  deleteOnClick(id: number): void {
    this.store.dispatch(new DeleteProduct(id));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  //#endregion
}
