import produce from "immer";
import { CompaniesReducerAction, ActionTypes, ICompaniesState } from "./types";

const INITIAL_STATE: ICompaniesState = {
  data: {
    companies: [],
    company: {
      cnpj: "",
      createdAt: new Date(),
      id: "",
      name: "",
      socialName: "",
    },
  },
  error: "",
  loading: false,
};

export const companies = (
  state = INITIAL_STATE,
  action: CompaniesReducerAction
) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.STORE_COMPANY_REQUEST:
        draft.data.companies.push(action.payload);
        draft.data.company = action.payload;
        break;

      default:
        break;
    }
  });
};
