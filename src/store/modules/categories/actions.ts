import { ActionTypes } from "./types";
import { action } from "typesafe-actions";
import { ICategory } from "../../../types/category";

export function actionStoreCategoryRequest(data: ICategory) {
  return action(ActionTypes.STORE_CATEGORY_REQUEST, data);
}

export function actionStoreCategorySuccess() {
  return action(ActionTypes.STORE_CATEGORY_SUCCESS);
}

export function actionStoreCategoryFailure(error: string) {
  return action(ActionTypes.STORE_CATEGORY_FAILURE, error);
}

export function actionArchiveCategoryRequest(data: { categoryId: string }) {
  return action(ActionTypes.ARCHIVE_CATEGORY_REQUEST, data);
}

export function actionUpdateCategoryRequest(
  categoryId: string,
  data: Partial<ICategory>
) {
  return action(ActionTypes.UPDATE_CATEGORY_REQUEST, { data, categoryId });
}
