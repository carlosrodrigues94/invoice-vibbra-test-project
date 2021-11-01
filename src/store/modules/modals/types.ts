import { ActionType } from "typesafe-actions";

import * as actions from "./actions";

export type ModalData = {
  id: string;
  name: string;
  description: string;
};

export type IModalsState = {
  data: { id: string; name: string; description: string };
  loading: boolean;
  error: string;
};

export enum ActionTypes {
  SET_SHOW_MODAL_REQUEST = "@MODALS/SET_SHOW_MODAL/REQUEST",
  SET_CLOSE_MODAL_REQUEST = "@MODALS/SET_CLOSE_MODAL/REQUEST",
}

export type ModalStateReducerAction = ActionType<typeof actions>;
