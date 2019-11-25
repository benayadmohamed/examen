import {Component, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {UserState} from "../../../user/store/user.state";
import {CategoryState} from "../../store/category.state";
import {Category} from "../../category-model";
import {DeleteCategoryRequest} from "../../store/category.actions";

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  @Select(CategoryState.categories)
  categories$: Observable<Category>;
  @Select(CategoryState.page)
  pages$: Observable<any>;
  @Select(CategoryState.isLoading)
  categoriesIsLoading$: Observable<boolean>;

  constructor(private store: Store) {
  }

  ngOnInit() {
  }

  delete(data: string) {
    this.store.dispatch(new DeleteCategoryRequest({url: data})).subscribe(value => {
    });
  }
}
