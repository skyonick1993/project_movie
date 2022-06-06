import { actionTypes } from "../types/actionType";

let initialState = {
  chiTietPhongVe: {
    thongTinPhim: {},
    danhSachGhe: [],
  },
  danhSachGheDangDat: [],
  danhSachGheKhachDat: [],
  tabActive: "1",
};

export const bookingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_BOOKING_INFO:
      state.chiTietPhongVe = payload;
      return { ...state };
    case actionTypes.SET_ITEM_INFO:
      state.danhSachGheDangDat = payload;
      return { ...state };
    case actionTypes.SET_COMPLETED_BOOKING:
      state.danhSachGheDangDat = [];
      return { ...state };
    case actionTypes.SET_KEY_TAB:
      state.tabActive = payload;
      return { ...state };
    case actionTypes.SET_SEAT_USER:
      state.danhSachGheKhachDat = payload;
      return { ...state };
    default:
      return state;
  }
};
