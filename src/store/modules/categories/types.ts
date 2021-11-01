import { ActionType } from "typesafe-actions";
import { ICategory } from "../../../types/category";

import * as actions from "./actions";

export type ICategoriesState = {
  data: { category: ICategory; categories: ICategory[] };
  loading: boolean;
  error: string;
};

export enum ActionTypes {
  STORE_CATEGORY_REQUEST = "@CATEGORY/STORE_CATEGORY/REQUEST",
  STORE_CATEGORY_SUCCESS = "@CATEGORY/STORE_CATEGORY/SUCCESS",
  STORE_CATEGORY_FAILURE = "@CATEGORY/STORE_CATEGORY/FAILURE",

  ARCHIVE_CATEGORY_REQUEST = "@CATEGORY/ARCHIVE_CATEGORY/REQUEST",

  UPDATE_CATEGORY_REQUEST = "@CATEGORY/UPDATE_CATEGORY/REQUEST",
}

export type CategoriesStateReducerAction = ActionType<typeof actions>;
