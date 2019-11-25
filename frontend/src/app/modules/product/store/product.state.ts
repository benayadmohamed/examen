import {Action, Selector, State, StateContext} from '@ngxs/store';
import {
  AddProductRequest, ChangeParamsProducts,
  DeleteProductRequest,
  LoadNextPageProducts, LoadPrevPageProducts,
  LoadProductsRequest,
  UpdateProductRequest
} from './product.actions';
import {append, compose, patch, removeItem, updateItem} from '@ngxs/store/operators';
import {tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Product} from "../product-model";
import {ProductService} from "../services/product.service";

export interface ProductStateModel {
  isLoading: boolean;
  products: Product[];
  isLoaded: boolean;
  _links: any;
  page?: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };

}


@State<ProductStateModel>({
  name: 'product',
  defaults: {
    _links: {},
    products: [],
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

export class ProductState {
  constructor(private productService: ProductService) {
  }

  @Selector()
  static products(state: ProductStateModel) {
    return state.products;
  }

  @Selector()
  static page(state: ProductStateModel) {
    return state.page;
  }

  @Selector()
  static links(state: ProductStateModel) {
    return state._links;
  }

  @Selector()
  static isLoaded(state: ProductStateModel) {
    return state.isLoaded;
  }

  @Selector()
  static isLoading(state: ProductStateModel) {
    return state.isLoading;
  }

  @Action(LoadProductsRequest)
  loadProducts(ctx: StateContext<ProductStateModel>, {}: LoadProductsRequest) {
    const state = ctx.getState();
    if (!state.isLoaded) {
      return this.productService.findAll().pipe(tap(x => {
        ctx.setState({...state, products: x._embedded.products, page: x.page, _links: x._links, isLoaded: true});
      }));
    } else {
      return of(true);
    }
  }

  @Action(LoadNextPageProducts)
  loadNextPageProducts(ctx: StateContext<ProductStateModel>, {}: LoadNextPageProducts) {
    const state = ctx.getState();
    return this.productService.findByUrl(state._links.next.href).pipe(tap(x => {
      ctx.setState({...state, products: x._embedded.products, page: x.page, _links: x._links, isLoaded: true});
    }));
  }

  @Action(LoadPrevPageProducts)
  loadPrevPageProducts(ctx: StateContext<ProductStateModel>, {}: LoadPrevPageProducts) {
    const state = ctx.getState();
    return this.productService.findByUrl(state._links.prev.href).pipe(tap(x => {
      ctx.setState({...state, products: x._embedded.products, page: x.page, _links: x._links, isLoaded: true});
    }));
  }

  @Action(ChangeParamsProducts)
  ChangeParamsProducts(ctx: StateContext<ProductStateModel>, {payload}: ChangeParamsProducts) {
    const state = ctx.getState();
    return this.productService.findByUrlAndChangeParams(state._links.self.href, payload.name, payload.value).pipe(tap(x => {
      ctx.setState({...state, products: x._embedded.products, page: x.page, _links: x._links, isLoaded: true});
    }));
  }

  @Action(AddProductRequest)
  addProduct(ctx: StateContext<ProductStateModel>, {payload}: AddProductRequest) {
    ctx.setState({...ctx.getState(), isLoading: true});
    return this.productService.save(payload.product).pipe(tap(x => {
      ctx.setState(
        patch({
          products: append([x]),
        })
      );
      ctx.setState({...ctx.getState(), isLoading: true});
    }));
  }

  @Action(DeleteProductRequest)
  removeProduct(ctx: StateContext<ProductStateModel>, {payload}: DeleteProductRequest) {
    ctx.setState({...ctx.getState(), isLoading: true});
    return this.productService.delete(payload.url).pipe(tap(x => {
      ctx.setState(
        patch({
          products: removeItem<Product>(value => value._links.self.href === payload.url)
        })
      );
      ctx.setState({...ctx.getState(), isLoading: false});
    }));
  }


  @Action(UpdateProductRequest)
  changeProduct(ctx: StateContext<ProductStateModel>, {payload}: UpdateProductRequest) {
    ctx.setState(
      patch({
        products: updateItem<Product>(value => value.id === payload.product.id, payload.product)
      })
    );
  }

}
