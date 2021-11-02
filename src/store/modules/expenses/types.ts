import { ICategory } from "types/category";
import { ActionType } from "typesafe-actions";

import * as actions from "./actions";

export type IExpense = {
  value: number;
  maskedValue: string;
  name: string;
  paymentDate: Date;
  competenceDate: Date;
  companyId: string;
  categoryId: string;
  id: string;
};

export type IExpensesState = {
  data: {
    expense: IExpense;
    expenses: IExpense[];
    expensesByMonth: {
      expenses: Array<{ month: string; value: number }>;
      years: number[];
      yearSelected: number;
    };

    expensesByCategory: {
      data: Array<{
        category: ICategory;
        value: number;
      }>;
      yearSelected: number;
      years: number[];
    };
  };
  loading: boolean;
  error: string;
};

export enum ActionTypes {
  STORE_EXPENSE_REQUEST = "@EXPENSE/STORE_EXPENSE/REQUEST",
  STORE_EXPENSE_SUCCESS = "@EXPENSE/STORE_EXPENSE/SUCCESS",
  STORE_EXPENSE_FAILURE = "@EXPENSE/STORE_EXPENSE/FAILURE",

  INDEX_EXPENSE_BY_MONTH_REQUEST = "@EXPENSE/INDEX_BY_MONTH/REQUEST",
  INDEX_EXPENSE_BY_CATEGORY_REQUEST = "@EXPENSE/INDEX_BY_CATEGORY/REQUEST",
  INDEX_EXPENSE_BY_CATEGORY_SUCCESS = "@EXPENSE/INDEX_BY_CATEGORY/SUCCESS",

  DELETE_EXPENSE_REQUEST = "@EXPENSE/DELETE_EXPENSE/REQUEST",

  UPDATE_EXPENSE_REQUEST = "@EXPENSE/UPDATE_EXPENSE/REQUEST",
}

export type ExpensesStateReducerAction = ActionType<typeof actions>;
