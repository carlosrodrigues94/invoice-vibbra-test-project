import { ActionType } from "typesafe-actions";

import * as actions from "./actions";

export type IInvoice = {
  id: string;
  value: string;
  valueUnmasked: number;
  description: string;
  month: string;
  dateReceived: Date;
};

export type InvoiceValuesMonthly = { month: string; value: number };

export type IInvoicesState = {
  data: {
    invoice: IInvoice;
    invoices: IInvoice[];
    valuesMonthly: InvoiceValuesMonthly[];
  };
  loading: boolean;
  error: string;
};

export enum ActionTypes {
  STORE_INVOICE_REQUEST = "@INVOICE/STORE_INVOICE/REQUEST",
  STORE_INVOICE_SUCCESS = "@INVOICE/STORE_INVOICE/SUCCESS",
  STORE_INVOICE_FAILURE = "@INVOICE/STORE_INVOICE/FAILURE",

  UPDATE_INVOICE_REQUEST = "@INVOICE/UPDATE_INVOICE/REQUEST",
  DELETE_INVOICE_REQUEST = "@INVOICE/DELETE_INVOICE/REQUEST",
}

export type InvoicesStateReducerAction = ActionType<typeof actions>;
