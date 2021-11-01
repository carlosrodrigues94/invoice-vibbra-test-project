import { ActionTypes, IExpense } from "./types";
import { action } from "typesafe-actions";

export function actionStoreExpenseeRequest(data: IExpense) {
  return action(ActionTypes.STORE_EXPENSE_REQUEST, data);
}

export function actionStoreExpenseeSuccess() {
  return action(ActionTypes.STORE_EXPENSE_SUCCESS);
}

export function actionStoreExpenseeFailure(error: string) {
  return action(ActionTypes.STORE_EXPENSE_FAILURE, error);
}

export function actionUpdateExpenseeRequest(
  expenseId: string,
  data: Partial<IExpense>
) {
  return action(ActionTypes.UPDATE_EXPENSE_REQUEST, { data, expenseId });
}

export function actionDeleteExpenseeRequest(expenseId: string) {
  return action(ActionTypes.DELETE_EXPENSE_REQUEST, { expenseId });
}
