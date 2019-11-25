import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Category} from "../category-model";
import {environment} from "../../../../environments/environment";

@Injectable()
export class CategoryService {
  url = environment.baseUrlApi2;

  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<{
    _embedded: { categories: Category[] },
    page: {
      size: number;
      totalElements: number;
      totalPages: number;
      number: number;
    };
  }> {
    return this.http.get<any>(this.url + 'categories');
  }

  public save(category: Category): Observable<any> {
    return this.http.post<any>(this.url + 'categories', category);
  }

  public update(category: Category): Observable<Category> {
    return this.http.put<Category>(this.url + 'categories', category);
  }

  public delete(url): Observable<any> {
    return this.http.delete<any>(url);
  }


}
