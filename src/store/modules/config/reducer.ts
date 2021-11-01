import produce from "immer";
import { ActionTypes, ConfigStateReducerAction, IConfigState } from "./types";

const INITIAL_STATE: IConfigState = {
  data: {
    limitRevenuesMEI: 8_100_000,
    limitRevenuesDefault: 8_100_000,
    period: "yearly",
    revenuesAlerts: { sendEmail: true, sendSms: true },
  },
  loading: false,
  error: "",
};

export const config = (
  state = INITIAL_STATE,
  action: ConfigStateReducerAction
) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.SET_LIMIT_VALUE_REVENUES_MEI:
        draft.data.limitRevenuesMEI = action.payload.value;
        break;

      case ActionTypes.SET_LIMIT_PERIOD_REVENUES_MEI:
        draft.data.period = action.payload.period;
        break;

      case ActionTypes.UPDATE_CONFIG_ALERT:
        Object.keys(action.payload).forEach((key) => {
          if (key === "sendEmail") {
            if (action.payload.sendEmail === undefined) return;
            draft.data.revenuesAlerts.sendEmail = action.payload.sendEmail;
          }

          if (key === "sendSms") {
            if (action.payload.sendSms === undefined) return;
            draft.data.revenuesAlerts.sendSms = action.payload.sendSms;
          }
        });

        break;

      default:
        break;
    }
  });
};
