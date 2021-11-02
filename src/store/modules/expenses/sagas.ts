import { all, put, select, takeLatest } from "@redux-saga/core/effects";
import { SagaIterator } from "@redux-saga/types";
import { IState } from "../../index";
import { ICategoriesState } from "../categories/types";

import {
  actionIndexExpensesByCategoryRequest,
  actionIndexExpensesByCategorySuccess,
} from "./actions";
import { ActionTypes, IExpensesState } from "./types";

type IndexExpensesByCategorySagaProps = ReturnType<
  typeof actionIndexExpensesByCategoryRequest
>;

export function* indexExpensesByCategory({
  payload,
}: IndexExpensesByCategorySagaProps): SagaIterator {
  const {
    data: { categories },
  }: ICategoriesState = yield select((state: IState) => state.categories);

  const {
    data: { expenses },
  }: IExpensesState = yield select((state: IState) => state.expenses);

  const filtered = categories.map((category) => {
    const categoryExpenses = expenses.filter((expense) => {
      const expenseYear = new Date(expense.competenceDate).getFullYear();
      if (expense.categoryId !== category.id) return false;
      if (expenseYear !== payload.yearSelected) return false;

      return true;
    });

    const value = categoryExpenses
      .map((item) => item.value)
      .reduce((prev, curr) => prev + curr, 0);

    return { category, value };
  });

  const years = new Set(
    expenses.map((expense) => new Date(expense.paymentDate).getFullYear())
  );

  yield put(
    actionIndexExpensesByCategorySuccess({
      years: Array.from(years),
      data: filtered,
      yearSelected: payload.yearSelected,
    })
  );
}

export default all([
  takeLatest(
    ActionTypes.INDEX_EXPENSE_BY_CATEGORY_REQUEST,
    indexExpensesByCategory
  ),
]);
