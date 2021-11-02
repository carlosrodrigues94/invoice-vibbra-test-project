import { all } from "redux-saga/effects";

import indexExpensesByCategory from "./expenses/sagas";

export function* rootSaga(): Generator {
  return yield all([indexExpensesByCategory]);
}
