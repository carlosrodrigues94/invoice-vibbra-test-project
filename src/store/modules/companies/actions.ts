import { action } from "typesafe-actions";
import { ICompany } from "../../../types/company";
import { ActionTypes } from "./types";

export function actionStoreCompanyRequest(data: ICompany) {
  return action(ActionTypes.STORE_COMPANY_REQUEST, data);
}

export function actionShowCompanyRequest(data: ICompany) {
  return action(ActionTypes.SHOW_COMPANY_REQUEST, data);
}

export function actionIndexCompanyRequest(data: ICompany) {
  return action(ActionTypes.INDEX_COMPANY_REQUEST, data);
}
