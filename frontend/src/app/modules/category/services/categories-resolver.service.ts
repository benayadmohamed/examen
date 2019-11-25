import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';
import {LoadCategorysRequest} from "../store/category.actions";

@Injectable()
export class CategoriesResolverService implements Resolve<any> {

  constructor(private store: Store) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.store.dispatch(new LoadCategorysRequest());
  }
}
