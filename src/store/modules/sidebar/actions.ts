import { ActionTypes } from "./types";
import { action } from "typesafe-actions";

export function actionSetToggleSidebarRequest() {
  return action(ActionTypes.SET_TOGGLE_SIDEBAR_REQUEST);
}

export function actionSetToggleSidebarSuccess() {
  return action(ActionTypes.SET_TOGGLE_SIDEBAR_SUCCESS);
}

export function actionSetToggleSidebarFailure(error: string) {
  return action(ActionTypes.SET_TOGGLE_SIDEBAR_FAILURE, error);
}

export function actionSetCloseSidebarRequest() {
  return action(ActionTypes.SET_CLOSE_SIDEBAR_REQUEST);
}
