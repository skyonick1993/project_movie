import { actionTypes } from "../types/actionType";

let initialState = {
  bannerList: [
    {
      maBanner: 1,
      maPhim: 1282,
      hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy.png",
    },
  ],
};

export const carouselReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_CAROUSEL_LIST:
      state.bannerList = payload;
      return { ...state };

    default:
      return state;
  }
};
