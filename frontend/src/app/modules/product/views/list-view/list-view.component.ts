import {Component, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {UserState} from "../../../user/store/user.state";
import {ProductState} from "../../store/product.state";
import {Product} from "../../product-model";
import {
  ChangeParamsProducts,
  DeleteProductRequest,
  LoadNextPageProducts,
  LoadPrevPageProducts
} from "../../store/product.actions";

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  @Select(ProductState.products)
  products$: Observable<Product>;
  @Select(ProductState.page)
  pages$: Observable<any>;
  @Select(ProductState.links)
  links$: Observable<any>;
  @Select(ProductState.isLoading)
  productsIsLoading$: Observable<boolean>;

  constructor(private store: Store) {
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  ngOnInit() {

  }

  delete(data: string) {
    this.store.dispatch(new DeleteProductRequest({url: data})).subscribe(value => {
    });
  }

  next() {
    this.store.dispatch(new LoadNextPageProducts());
  }

  prev() {
    this.store.dispatch(new LoadPrevPageProducts());
  }

  chnageParams(vname, vvalue) {
    this.store.dispatch(new ChangeParamsProducts({name: vname, value: vvalue}));
  }

  search(vvalue: string) {
    this.store.dispatch(new ChangeParamsProducts({name: 'name', value: vvalue}));
  }
}
