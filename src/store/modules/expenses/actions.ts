import { ActionTypes, IExpense } from "./types";
import { action } from "typesafe-actions";
import { ICategory } from "types/category";

export function actionStoreExpenseeRequest(data: IExpense) {
  return action(ActionTypes.STORE_EXPENSE_REQUEST, data);
}

export function actionStoreExpensesSuccess() {
  return action(ActionTypes.STORE_EXPENSE_SUCCESS);
}

export function actionStoreExpensesFailure(error: string) {
  return action(ActionTypes.STORE_EXPENSE_FAILURE, error);
}

export function actionUpdateExpensesRequest(
  expenseId: string,
  data: Partial<IExpense>
) {
  return action(ActionTypes.UPDATE_EXPENSE_REQUEST, { data, expenseId });
}

export function actionDeleteExpensesRequest(expenseId: string) {
  return action(ActionTypes.DELETE_EXPENSE_REQUEST, { expenseId });
}

export function actionIndexExpensesByMonthRequest(data: {
  yearSelected: number;
}) {
  return action(ActionTypes.INDEX_EXPENSE_BY_MONTH_REQUEST, data);
}

export function actionIndexExpensesByCategoryRequest(data: {
  yearSelected: number;
}) {
  return action(ActionTypes.INDEX_EXPENSE_BY_CATEGORY_REQUEST, data);
}

export function actionIndexExpensesByCategorySuccess(data: {
  data: Array<{
    category: ICategory;
    value: number;
  }>;
  yearSelected: number;
  years: number[];
}) {
  return action(ActionTypes.INDEX_EXPENSE_BY_CATEGORY_SUCCESS, data);
}
