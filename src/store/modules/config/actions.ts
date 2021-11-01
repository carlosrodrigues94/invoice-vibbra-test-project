import { ActionTypes, IConfig } from "./types";
import { action } from "typesafe-actions";

export function actionSetLimitValueRevenuesMEI(data: { value: number }) {
  return action(ActionTypes.SET_LIMIT_VALUE_REVENUES_MEI, data);
}

export function actionSetLimitPeriodRevenuesMEI(data: {
  period: IConfig["period"];
}) {
  return action(ActionTypes.SET_LIMIT_PERIOD_REVENUES_MEI, data);
}

export function actionUpdateConfigAlertRevenues(
  data: Partial<IConfig["revenuesAlerts"]>
) {
  return action(ActionTypes.UPDATE_CONFIG_ALERT, data);
}
