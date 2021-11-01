import { ActionTypes, ModalData } from "./types";
import { action } from "typesafe-actions";

export function actionSetShowModalRequest(data: ModalData) {
  return action(ActionTypes.SET_SHOW_MODAL_REQUEST, data);
}

export function actionSetCloseModalRequest() {
  return action(ActionTypes.SET_CLOSE_MODAL_REQUEST);
}
