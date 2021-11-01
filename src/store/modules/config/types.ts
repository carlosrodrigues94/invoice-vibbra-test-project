import { ActionType } from "typesafe-actions";

import * as actions from "./actions";

export type IConfig = {
  limitRevenuesMEI: number;
  limitRevenuesDefault: number;
  period: "yearly" | "monthly";
  revenuesAlerts: { sendEmail: boolean; sendSms: boolean };
};

export type IConfigState = {
  data: IConfig;
  loading: boolean;
  error: string;
};

export enum ActionTypes {
  SET_LIMIT_VALUE_REVENUES_MEI = "@CONFIG/SET_LIMIT_VALUE_REVENUES_MEI/REQUEST",
  SET_LIMIT_PERIOD_REVENUES_MEI = "@CONFIG/SET_LIMIT_PERIOD_REVENUES_MEI/REQUEST",
  UPDATE_CONFIG_ALERT = "@CONFIG/UPDATE_CONFIG_ALERT/REQUEST",
}

export type ConfigStateReducerAction = ActionType<typeof actions>;
