import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductRoutingModule} from './product-routing.module';
import {FormAddViewComponent} from './views/form-add-view/form-add-view.component';
import {ListViewComponent} from './views/list-view/list-view.component';
import {ProductState} from "./store/product.state";
import {NgxsModule} from "@ngxs/store";
import {ProductService} from "./services/product.service";
import {ProductsResolverService} from "./services/products-resolver.service";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [FormAddViewComponent, ListViewComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NgxsModule.forFeature([ProductState]),
    ReactiveFormsModule

  ],
  providers: [ProductService, ProductsResolverService]
})
export class ProductModule {
}
