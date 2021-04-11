import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
    { path: '', component: ProductComponent },
    { path: 'list', component: ProductListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductRoutingModule { }
