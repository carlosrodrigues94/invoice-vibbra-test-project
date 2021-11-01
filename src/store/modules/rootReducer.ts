import { combineReducers } from "redux";
import { modals } from "./modals/reducer";
import { sidebar } from "./sidebar/reducer";
import { companies } from "./companies/reducer";
import { categories } from "./categories/reducer";
import { config } from "./config/reducer";
import { invoices } from "./invoices/reducer";
import { expenses } from "./expenses/reducer";

export const rootReducer = combineReducers({
  modals,
  sidebar,
  companies,
  categories,
  config,
  invoices,
  expenses,
});
