import produce from "immer";
import { ActionTypes, IModalsState, ModalStateReducerAction } from "./types";

const INITIAL_STATE: IModalsState = {
  data: { description: "", id: "", name: "" },
  loading: false,
  error: "",
};

export const modals = (
  state = INITIAL_STATE,
  action: ModalStateReducerAction,
) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.SET_SHOW_MODAL_REQUEST:
        draft.data = action.payload;
        break;

      case ActionTypes.SET_CLOSE_MODAL_REQUEST:
        draft.data = { description: "", name: "", id: "" };
        break;

      default:
        break;
    }
  });
};
