import { ActionTypes, IInvoice } from "./types";
import { action } from "typesafe-actions";

export function actionStoreInvoiceRequest(data: IInvoice) {
  return action(ActionTypes.STORE_INVOICE_REQUEST, data);
}

export function actionStoreInvoiceSuccess() {
  return action(ActionTypes.STORE_INVOICE_SUCCESS);
}

export function actionStoreInvoiceFailure(error: string) {
  return action(ActionTypes.STORE_INVOICE_FAILURE, error);
}

export function actionUpdateInvoiceRequest(
  invoiceId: string,
  data: Partial<IInvoice>
) {
  return action(ActionTypes.UPDATE_INVOICE_REQUEST, { data, invoiceId });
}

export function actionDeleteInvoiceRequest(invoiceId: string) {
  return action(ActionTypes.DELETE_INVOICE_REQUEST, { invoiceId });
}

export function actionIndexInvoiceByMonthRequest(data: {
  yearSelected: number;
}) {
  return action(ActionTypes.INDEX_INVOICE_BY_MONTH_REQUEST, data);
}
