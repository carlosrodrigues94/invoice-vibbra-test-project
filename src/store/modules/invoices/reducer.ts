import produce from "immer";
import { months } from "../../../utils/months";
import {
  ActionTypes,
  IInvoicesState,
  InvoicesStateReducerAction,
} from "./types";

const INITIAL_STATE: IInvoicesState = {
  data: {
    invoices: [],
    invoicesByMonth: {
      invoices: [],
      years: [],
      yearSelected: new Date().getFullYear(),
    },

    invoice: {
      value: 0,
      id: "",
      description: "",
      dateReceived: new Date(),
      month: "",
      maskedValue: "",
    },
  },
  loading: false,
  error: "",
};

export const invoices = (
  state = INITIAL_STATE,
  action: InvoicesStateReducerAction
) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.STORE_INVOICE_REQUEST:
        draft.data.invoices.push(action.payload);

        break;

      case ActionTypes.UPDATE_INVOICE_REQUEST:
        const invoiceIndex = draft.data.invoices.findIndex(
          (inv) => inv.id === action.payload.invoiceId
        );

        if (invoiceIndex < 0) return;

        const invoice = draft.data.invoices[invoiceIndex];

        const newInvoice = { ...invoice, ...action.payload.data };

        draft.data.invoices.splice(invoiceIndex, 1);

        draft.data.invoices.push(newInvoice);

        break;

      case ActionTypes.DELETE_INVOICE_REQUEST:
        const invoiceInd = draft.data.invoices.findIndex(
          (inv) => inv.id === action.payload.invoiceId
        );

        if (invoiceInd < 0) return;

        draft.data.invoices.splice(invoiceInd, 1);
        break;

      case ActionTypes.INDEX_INVOICE_BY_MONTH_REQUEST:
        const { invoices } = draft.data;
        const { yearSelected } = action.payload;

        const invoicesByMonth = months.map(({ shortName }) => {
          return invoices
            .filter((item) => item.month === shortName)
            .filter(
              (item) =>
                new Date(item.dateReceived).getFullYear() === yearSelected
            )
            .map((item) => ({ month: item.month, value: item.value }))
            .reduce(
              (prev, curr) => {
                return { month: shortName, value: prev.value + curr.value };
              },
              { month: shortName, value: 0 }
            );
        });

        const yearsFiltered = new Set(
          invoices.map((invoices) =>
            new Date(invoices.dateReceived).getFullYear()
          )
        );

        const years = Array.from(yearsFiltered);

        draft.data.invoicesByMonth = {
          invoices: invoicesByMonth,
          years,
          yearSelected: action.payload.yearSelected,
        };

        break;

      default:
        break;
    }
  });
};
