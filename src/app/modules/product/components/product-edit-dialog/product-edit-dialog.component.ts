import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ClearProduct } from '../../actions';

@Component({
  selector: 'app-product-edit-dialog',
  templateUrl: './product-edit-dialog.component.html',
  styleUrls: ['./product-edit-dialog.component.scss']
})
export class ProductEditDialogComponent implements OnInit, OnDestroy {
  title: string = 'Edit Product';
  color: string = 'primary';

  
  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ClearProduct());
  }
}
