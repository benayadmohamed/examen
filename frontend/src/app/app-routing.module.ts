import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./layout/login/login.component";
import {ErrorComponent} from "./layout/error/error.component";
import {IsAuthentifiedGuard} from "./guards/is-authentified.guard";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  }, {
    path: 'main',
    canActivate: [IsAuthentifiedGuard],
    canActivateChild: [IsAuthentifiedGuard],
    canLoad: [IsAuthentifiedGuard],
    loadChildren: () => import('./layout/layout.module').then(mod => mod.LayoutModule),
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
