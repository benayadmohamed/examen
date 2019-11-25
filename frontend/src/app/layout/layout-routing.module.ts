import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './main/main.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      }, {
        path: 'products',
        loadChildren: () => import('../modules/product/product.module').then(mod => mod.ProductModule),
      }, {
        path: 'categories',
        loadChildren: () => import('../modules/category/category.module').then(mod => mod.CategoryModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
