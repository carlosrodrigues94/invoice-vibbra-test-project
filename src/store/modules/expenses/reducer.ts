import produce from "immer";
import { months } from "../../../utils/months";
import { getItemMonth } from "../../../utils/get-item-month";
import {
  ActionTypes,
  ExpensesStateReducerAction,
  IExpensesState,
} from "./types";

const INITIAL_STATE: IExpensesState = {
  data: {
    expenses: [],
    expensesByCategory: {
      data: [],
      yearSelected: new Date().getFullYear(),
      years: [],
    },
    expensesByMonth: {
      expenses: [],
      years: [],
      yearSelected: new Date().getFullYear(),
    },
    expense: {
      maskedValue: "",
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

      case ActionTypes.INDEX_EXPENSE_BY_MONTH_REQUEST:
        const { expenses } = draft.data;
        const { yearSelected } = action.payload;

        const expensesByMonth = months.map(({ shortName }) => {
          return expenses
            .filter((item) => {
              const expenseMonthNumber = new Date(
                item.competenceDate
              ).getMonth();

              const expenseMonth = months[expenseMonthNumber];

              if (expenseMonth.shortName === shortName) return item;

              return false;
            })
            .filter(
              (item) =>
                new Date(item.competenceDate).getFullYear() === yearSelected
            )
            .map((item) => ({
              month: getItemMonth(item.competenceDate),
              value: item.value,
            }))
            .reduce(
              (prev, curr) => {
                return { month: shortName, value: prev.value + curr.value };
              },
              { month: shortName, value: 0 }
            );
        });

        const yearsFiltered = new Set(
          expenses.map((invoices) =>
            new Date(invoices.competenceDate).getFullYear()
          )
        );

        const years = Array.from(yearsFiltered);

        draft.data.expensesByMonth = {
          years,
          expenses: expensesByMonth,
          yearSelected: action.payload.yearSelected,
        };

        break;

      case ActionTypes.INDEX_EXPENSE_BY_CATEGORY_REQUEST:
        draft.loading = true;
        break;

      case ActionTypes.INDEX_EXPENSE_BY_CATEGORY_SUCCESS:
        draft.loading = false;
        draft.data.expensesByCategory = action.payload;

        break;

      default:
        break;
    }
  });
};
