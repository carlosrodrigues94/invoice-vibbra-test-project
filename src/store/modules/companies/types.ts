import { ActionType } from "typesafe-actions";
import { ICompany } from "../../../types/company";
import * as actions from "./actions";

export enum ActionTypes {
  STORE_COMPANY_REQUEST = "@COMPANY_STORE/REQUEST",
  STORE_COMPANY_SUCCESS = "@COMPANY_STORE/SUCCESS",
  STORE_COMPANY_FAILURE = "@COMPANY_STORE/FAILURE",

  SHOW_COMPANY_REQUEST = "@COMPANY_SHOW/REQUEST",
  SHOW_COMPANY_SUCCESS = "@COMPANY_SHOW/SUCCESS",
  SHOW_COMPANY_FAILURE = "@COMPANY_SHOW/FAILURE",

  INDEX_COMPANY_REQUEST = "@COMPANY_INDEX/REQUEST",
  INDEX_COMPANY_SUCCESS = "@COMPANY_INDEX/SUCCESS",
  INDEX_COMPANY_FAILURE = "@COMPANY_INDEX/FAILURE",
}

export type CompaniesReducerAction = ActionType<typeof actions>;

export type ICompaniesState = {
  data: { company: ICompany; companies: ICompany[] };
  loading: boolean;
  error: string;
};
