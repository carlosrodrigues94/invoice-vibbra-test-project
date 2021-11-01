import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { IModalsState } from "./modules/modals/types";

import { rootReducer } from "./modules/rootReducer";
import { rootSaga } from "./modules/rootSaga";
import { ISidebarState } from "./modules/sidebar/types";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { ICompaniesState } from "./modules/companies/types";
import { ICategoriesState } from "./modules/categories/types";
import { IConfigState } from "./modules/config/types";
import { IInvoicesState } from "./modules/invoices/types";
import { IExpensesState } from "./modules/expenses/types";

export interface IState {
  modals: IModalsState;
  sidebar: ISidebarState;
  companies: ICompaniesState;
  categories: ICategoriesState;
  config: IConfigState;
  invoices: IInvoicesState;
  expenses: IExpensesState;
}

/**
 * Redux Persist
 */
const persist = () => {
  const persistedReducer = persistReducer(
    {
      key: "vibbra-invoice-test",
      storage,
      whitelist: ["companies", "categories", "invoices", "config", "expenses"],
    },
    rootReducer
  );

  return persistedReducer;
};

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(
  persist(),
  process.env.NODE_ENV === "development"
    ? composeWithDevTools(applyMiddleware(...middlewares))
    : applyMiddleware(...middlewares)
);

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };
