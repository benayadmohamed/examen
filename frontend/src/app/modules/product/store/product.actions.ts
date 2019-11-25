import {Product} from "../product-model";

export class LoadProductsRequest {
  static readonly type = '[Product] LoadProductsRequest';

  constructor() {
  }
}

export class LoadProductsPageAndSearchRequest {
  static readonly type = '[Product] LoadPageProductsRequest';

  constructor(payload: { size: number, page: number, search: string }) {
  }
}

export class LoadNextPageProducts {
  static readonly type = '[Product] LoadNextProductsRequest';

  constructor() {
  }
}

export class LoadPrevPageProducts {
  static readonly type = '[Product] LoadPrevPageProducts';

  constructor() {
  }
}

export class ChangeParamsProducts {
  static readonly type = '[Product] ChangeParamsProducts';

  constructor(public payload: { name: string, value: string }) {
  }
}

export class AddProductRequest {
  static readonly type = '[Product] AddProductRequest';

  constructor(public payload: { product: Product }) {
  }
}


export class UpdateProductRequest {
  static readonly type = '[Product] UpdateProductRequest';

  constructor(public payload: { product: Product }) {
  }
}


export class DeleteProductRequest {
  static readonly type = '[Product] DeleteProductRequest';

  constructor(public payload: { url: string }) {
  }
}


