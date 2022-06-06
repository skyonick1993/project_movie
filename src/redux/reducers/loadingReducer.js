import { actionTypes } from "../types/actionType";

const initialState = {
  isLoading: false,
};

export const loadingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_DISPLAY_LOADING:
      state.isLoading = true;
      return { ...state };
    case actionTypes.SET_HIDE_LOADING:
      state.isLoading = false;
      return { ...state };
    default:
      return state;
  }
};
