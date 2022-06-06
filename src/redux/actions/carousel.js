import { createAction } from ".";
import { actionTypes } from "../types/actionType";
import { quanLyPhim } from "../../services/QuanLyPhimService";

export const carouselAction = async (dispatch) => {
  try {
    let res = await quanLyPhim.layDanhSachBanner();
    console.log(res.data.content);
    dispatch(createAction(actionTypes.SET_CAROUSEL_LIST, res.data.content));
  } catch (err) {
    console.log(err);
  }
};
