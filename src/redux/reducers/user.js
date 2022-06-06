import { USER_LOGIN } from "../../util/settings/config";
import { actionTypes } from "../types/actionType";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

let initialState = {
  userLogin: user,
  thongTinUser: {},
  danhSachUser: [],
  thongTinUsernames: {},
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_USER_LOGIN:
      state.userLogin = payload;
      return { ...state };
    case actionTypes.SET_USER_INFO:
      state.thongTinUser = payload;
      return { ...state };
    case actionTypes.SET_USER_LIST:
      state.danhSachUser = payload;
      return { ...state };
    case actionTypes.SET_USERNAMES_INFO:
      state.thongTinUsernames = payload;
      return { ...state };
    default:
      return state;
  }
};
