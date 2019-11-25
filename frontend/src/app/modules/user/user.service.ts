import {Injectable} from '@angular/core';
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UserModel} from "./user-model";
import {Store} from "@ngxs/store";
import {LoadPrivilagesRequest} from "./store/user.actions";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.baseUrlApi;

  constructor(private http: HttpClient, private store: Store) {
  }

  public signUp(user: UserModel): Observable<{
    token: string
  }> {
    return this.http.post<{
      token: string
    }>(this.url + 'login', user).pipe(map(value => {
      this.setToken(value.token);
      return value;
    }));
  }

  public logout(): Observable<string> {
    return this.http.get<any>(this.url + 'logout')
      .pipe(map(value => {
        this.removeData();
        return value;
      }));
  }

  private removeData() {
    localStorage.removeItem('token');
    localStorage.removeItem('commercial');
    localStorage.removeItem('roles');
  }

  private setToken(token) {
    localStorage.setItem('token', token);
  }

  public getToken() {
    // return localStorage.getItem('token');
    return localStorage.getItem('token');
  }

  private payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  public getPermissions(): [] {
    const token = this.getToken();
    const payload = this.payload(token);
    return payload.privileges;
  }

  public isValid() {
    const token = this.getToken();
    if (token && token !== '') {
      const payload = this.payload(token);
      const date = new Date(0);
      date.setUTCSeconds(payload.exp);
      if ((date.valueOf() > new Date().valueOf())) {
        return true;
      }
    }
    return false;
  }

  private decode(payload) {

    return JSON.parse(atob(payload));
  }

}
