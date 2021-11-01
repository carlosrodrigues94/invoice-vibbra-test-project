import produce from "immer";
import { ActionTypes, ISidebarState, SidebarStateReducerAction } from "./types";

const INITIAL_STATE: ISidebarState = {
  data: { isOpened: false },
  loading: false,
  error: "",
};

export const sidebar = (
  state = INITIAL_STATE,
  action: SidebarStateReducerAction,
) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.SET_TOGGLE_SIDEBAR_REQUEST:
        if (draft.data.isOpened) {
          draft.data.isOpened = false;
        } else {
          draft.data.isOpened = true;
        }
        draft.loading = false;

        break;

      case ActionTypes.SET_CLOSE_SIDEBAR_REQUEST:
        draft.loading = false;
        draft.data.isOpened = false;

        break;

      default:
        break;
    }
  });
};
