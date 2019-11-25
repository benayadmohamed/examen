import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';
import {LoadProductsRequest} from "../store/product.actions";

@Injectable()
export class ProductsResolverService implements Resolve<any> {

  constructor(private store: Store) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.store.dispatch(new LoadProductsRequest());
  }
}
