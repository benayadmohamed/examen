import {Category} from "../category-model";

export class LoadCategorysRequest {
  static readonly type = '[Category] LoadCategorysRequest';

  constructor() {
  }
}

export class AddCategoryRequest {
  static readonly type = '[Category] AddCategoryRequest';

  constructor(public payload: { category: Category }) {
  }
}


export class UpdateCategoryRequest {
  static readonly type = '[Category] UpdateCategoryRequest';

  constructor(public payload: { category: Category }) {
  }
}


export class DeleteCategoryRequest {
  static readonly type = '[Category] DeleteCategoryRequest';

  constructor(public payload: { url: string }) {
  }
}


