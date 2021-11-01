import { ActionType } from "typesafe-actions";

import * as actions from "./actions";

export type IExpense = {
  value: number;
  name: string;
  paymentDate: Date;
  competenceDate: Date;
  companyId: string;
  categoryId: string;
  id: string;
};

export type IExpensesState = {
  data: { expense: IExpense; expenses: IExpense[] };
  loading: boolean;
  error: string;
};

export enum ActionTypes {
  STORE_EXPENSE_REQUEST = "@EXPENSE/STORE_EXPENSE/REQUEST",
  STORE_EXPENSE_SUCCESS = "@EXPENSE/STORE_EXPENSE/SUCCESS",
  STORE_EXPENSE_FAILURE = "@EXPENSE/STORE_EXPENSE/FAILURE",

  DELETE_EXPENSE_REQUEST = "@EXPENSE/DELETE_EXPENSE/REQUEST",

  UPDATE_EXPENSE_REQUEST = "@EXPENSE/UPDATE_EXPENSE/REQUEST",
}

export type ExpensesStateReducerAction = ActionType<typeof actions>;
