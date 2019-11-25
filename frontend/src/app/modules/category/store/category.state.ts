import {Action, Selector, State, StateContext} from '@ngxs/store';
import {
  AddCategoryRequest,
  DeleteCategoryRequest,
  LoadCategorysRequest,
  UpdateCategoryRequest
} from './category.actions';
import {append, compose, patch, removeItem, updateItem} from '@ngxs/store/operators';
import {tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Category} from "../category-model";
import {CategoryService} from "../services/category.service";

export interface CategoryStateModel {
  isLoading: boolean;
  categories: Category[];
  isLoaded: boolean;
  page?: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };

}


@State<CategoryStateModel>({
  name: 'category',
  defaults: {
    categories: [],
    isLoaded: false,
    isLoading: false,
    page: {
      size: 20,
      totalElements: 0,
      totalPages: 0,
      number: 0,
    }
  }
})

export class CategoryState {
  constructor(private categoryService: CategoryService) {
  }

  @Selector()
  static categories(state: CategoryStateModel) {
    return state.categories;
  }

  @Selector()
  static page(state: CategoryStateModel) {
    return state.page;
  }

  @Selector()
  static isLoaded(state: CategoryStateModel) {
    return state.isLoaded;
  }

  @Selector()
  static isLoading(state: CategoryStateModel) {
    return state.isLoading;
  }

  @Action(LoadCategorysRequest)
  loadCategorys(ctx: StateContext<CategoryStateModel>, {}: LoadCategorysRequest) {
    const state = ctx.getState();
    if (!state.isLoaded) {
      return this.categoryService.findAll().pipe(tap(x => {
        ctx.setState({...state, categories: x._embedded.categories, page: x.page, isLoaded: true});
      }));
    } else {
      return of(true);
    }
  }

  @Action(AddCategoryRequest)
  addCategory(ctx: StateContext<CategoryStateModel>, {payload}: AddCategoryRequest) {
    ctx.setState({...ctx.getState(), isLoading: true});
    return this.categoryService.save(payload.category).pipe(tap(x => {
      ctx.setState(
        patch({
          categories: append([x]),
        })
      );
      ctx.setState({...ctx.getState(), isLoading: true});
    }));
  }

  @Action(DeleteCategoryRequest)
  removeCategory(ctx: StateContext<CategoryStateModel>, {payload}: DeleteCategoryRequest) {
    ctx.setState({...ctx.getState(), isLoading: true});
    return this.categoryService.delete(payload.url).pipe(tap(x => {
      ctx.setState(
        patch({
          categories: removeItem<Category>(value => value._links.self.href === payload.url)
        })
      );
      ctx.setState({...ctx.getState(), isLoading: false});
    }));
  }


  @Action(UpdateCategoryRequest)
  changeCategory(ctx: StateContext<CategoryStateModel>, {payload}: UpdateCategoryRequest) {
    ctx.setState(
      patch({
        categories: updateItem<Category>(value => value.id === payload.category.id, payload.category)
      })
    );
  }

}
