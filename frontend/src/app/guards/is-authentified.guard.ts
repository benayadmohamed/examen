import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad, Route, Router,
  RouterStateSnapshot, UrlSegment,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from "../modules/user/user.service";

@Injectable({
  providedIn: 'root'
})

export class IsAuthentifiedGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private user: UserService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.user.isValid()) {
      return true;
    } else {
      this.router.navigate(['/login']).then(value => {
      });
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.user.isValid()) {
      return true;
    } else {
      this.router.navigate(['/login']).then(value => {
      });
      return false;
    }
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.user.isValid();
  }

}
