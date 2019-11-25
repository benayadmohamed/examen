import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Product} from "../product-model";
import {environment} from "../../../../environments/environment";
import {DefaultUrlSerializer, UrlSerializer, UrlTree} from "@angular/router";

@Injectable()
export class ProductService {
  url = environment.baseUrlApi2;

  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<{
    _embedded: { products: Product[] },
    _links: any;
    page: {
      size: number;
      totalElements: number;
      totalPages: number;
      number: number;
    };
  }> {
    return this.http.get<any>(this.url + 'products/search/params?name');
  }

  public findByUrl(url): Observable<{
    _embedded: { products: Product[] },
    _links: any;
    page: {
      size: number;
      totalElements: number;
      totalPages: number;
      number: number;
    };
  }> {
    return this.http.get<any>(url);
  }

  public findByUrlAndChangeParams(url: string, name, value): Observable<{
    _embedded: { products: Product[] },
    _links: any;
    page: {
      size: number;
      totalElements: number;
      totalPages: number;
      number: number;
    };
  }> {
    let vparams = new HttpParams();
    const baseurl = url.split('?');
    const params = (baseurl[1]) ? baseurl[1].split('&') : null;
    if (params) {
      params.forEach(value1 => {
        const param = value1.split('=');
        const n = param[0];
        const v = param[1];
        vparams = vparams.append(n, (v) ? v : '');
      });
    }
    vparams = vparams.set(name, value);
    if (name !== 'page') {
      vparams = vparams.set('page', '0');
    }
    return this.http.get<any>(baseurl[0], {params: vparams});
  }

  public save(product: Product): Observable<any> {
    return this.http.post<any>(this.url + 'products', product);
  }

  public update(product: Product): Observable<Product> {
    return this.http.put<Product>(this.url + 'products', product);
  }

  public delete(url): Observable<any> {
    return this.http.delete<any>(url);
  }


}
