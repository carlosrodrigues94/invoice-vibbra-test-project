import { ActionType } from "typesafe-actions";

import * as actions from "./actions";

export type ISidebarState = {
  data: { isOpened: boolean };
  loading: boolean;
  error: string;
};

export enum ActionTypes {
  SET_TOGGLE_SIDEBAR_REQUEST = "@SIDEBAR/SET_TOGGLE_SIDEBAR/REQUEST",
  SET_TOGGLE_SIDEBAR_SUCCESS = "@SIDEBAR/SET_TOGGLE_SIDEBAR/SUCCESS",
  SET_TOGGLE_SIDEBAR_FAILURE = "@SIDEBAR/SET_TOGGLE_SIDEBAR/FAILURE",
  SET_CLOSE_SIDEBAR_REQUEST = "@SIDEBAR/SET_CLOSE_SIDEBAR/REQUEST",
}

export type SidebarStateReducerAction = ActionType<typeof actions>;
