import produce from "immer";
import {
  ActionTypes,
  ICategoriesState,
  CategoriesStateReducerAction,
} from "./types";

const INITIAL_STATE: ICategoriesState = {
  data: {
    categories: [],
    category: { name: "", id: "", description: "", isArchived: false },
  },
  loading: false,
  error: "",
};

export const categories = (
  state = INITIAL_STATE,
  action: CategoriesStateReducerAction
) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.STORE_CATEGORY_REQUEST:
        draft.data.categories.push(action.payload);
        break;

      case ActionTypes.ARCHIVE_CATEGORY_REQUEST:
        const categoryIndex = draft.data.categories.findIndex(
          (cat) => cat.id === action.payload.categoryId
        );
        if (categoryIndex < 0) return;

        draft.data.categories[categoryIndex].isArchived = true;

        break;

      case ActionTypes.UPDATE_CATEGORY_REQUEST:
        const catIndex = draft.data.categories.findIndex(
          (cat) => cat.id === action.payload.categoryId
        );

        if (catIndex < 0) return;

        const category = draft.data.categories[catIndex];

        const newCategory = { ...category, ...action.payload.data };

        draft.data.categories.splice(catIndex, 1);

        draft.data.categories.push(newCategory);

        break;

      default:
        break;
    }
  });
};
