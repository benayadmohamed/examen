import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListViewComponent} from "./views/list-view/list-view.component";
import {FormAddViewComponent} from "./views/form-add-view/form-add-view.component";
import {CategoriesResolverService} from "./services/categories-resolver.service";


const routes: Routes = [
  {
    path: '',
    component: ListViewComponent,
    resolve: {data: CategoriesResolverService}
  }, {
    path: 'add',
    component: FormAddViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {
}
