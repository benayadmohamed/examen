import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CategoryRoutingModule} from './category-routing.module';
import {FormAddViewComponent} from './views/form-add-view/form-add-view.component';
import {ListViewComponent} from './views/list-view/list-view.component';
import {CategoryState} from "./store/category.state";
import {NgxsModule} from "@ngxs/store";
import {CategoryService} from "./services/category.service";
import {CategoriesResolverService} from "./services/categories-resolver.service";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [FormAddViewComponent, ListViewComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    NgxsModule.forFeature([CategoryState]),
    ReactiveFormsModule

  ],
  providers: [CategoryService, CategoriesResolverService]
})
export class CategoryModule {
}
