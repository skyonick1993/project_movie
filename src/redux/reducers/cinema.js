import { actionTypes } from "../types/actionType";

let initialState = {
  heThongRapChieu: [],
};

export const cinema = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_CINEMA_LIST:
      state.heThongRapChieu = payload;
      return { ...state };

    default:
      return state;
  }
};
