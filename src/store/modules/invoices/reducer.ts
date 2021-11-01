import produce from "immer";
import {
  ActionTypes,
  IInvoicesState,
  InvoicesStateReducerAction,
} from "./types";

const INITIAL_STATE: IInvoicesState = {
  data: {
    invoices: [],
    valuesMonthly: [
      {
        month: "jan",
        value: 0,
      },
      {
        month: "fev",
        value: 0,
      },
      {
        month: "mar",
        value: 0,
      },
      {
        month: "abr",
        value: 0,
      },
      {
        month: "mai",
        value: 0,
      },
      {
        month: "jun",
        value: 0,
      },
      {
        month: "jul",
        value: 0,
      },
      {
        month: "ago",
        value: 0,
      },
      {
        month: "set",
        value: 0,
      },
      {
        month: "out",
        value: 0,
      },
      {
        month: "nov",
        value: 0,
      },
      {
        month: "dez",
        value: 0,
      },
    ],
    invoice: {
      value: "",
      id: "",
      description: "",
      dateReceived: new Date(),
      month: "",
      valueUnmasked: 0,
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

      default:
        break;
    }
  });
};
