import produce from "immer";
import {
  ActionTypes,
  ExpensesStateReducerAction,
  IExpensesState,
} from "./types";

const INITIAL_STATE: IExpensesState = {
  data: {
    expenses: [],
    expense: {
      value: 0,
      id: "",
      categoryId: "",
      name: "",
      companyId: "",
      competenceDate: new Date(),
      paymentDate: new Date(),
    },
  },
  loading: false,
  error: "",
};

export const expenses = (
  state = INITIAL_STATE,
  action: ExpensesStateReducerAction
) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.STORE_EXPENSE_REQUEST:
        draft.data.expenses.push(action.payload);
        break;

      case ActionTypes.UPDATE_EXPENSE_REQUEST:
        const expenseIndex = draft.data.expenses.findIndex(
          (exp) => exp.id === action.payload.expenseId
        );

        if (expenseIndex < 0) return;

        const expense = draft.data.expenses[expenseIndex];

        const newExpense = { ...expense, ...action.payload.data };

        draft.data.expenses.splice(expenseIndex, 1);

        draft.data.expenses.push(newExpense);

        break;

      case ActionTypes.DELETE_EXPENSE_REQUEST:
        const expenseInd = draft.data.expenses.findIndex(
          (exp) => exp.id === action.payload.expenseId
        );

        if (expenseInd < 0) return;

        draft.data.expenses.splice(expenseInd, 1);
        break;

      default:
        break;
    }
  });
};
