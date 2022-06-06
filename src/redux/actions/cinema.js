import { createAction } from ".";
import { quanLyRap } from "../../services/QuanLyRapService";
import { actionTypes } from "../types/actionType";

export const cinemaAction = () => {
  return async (dispatch) => {
    dispatch(createAction(actionTypes.SET_DISPLAY_LOADING));
    try {
      let res = await quanLyRap.layThongTinLichChieu();
      await dispatch(
        createAction(actionTypes.SET_CINEMA_LIST, res.data.content)
      );
      dispatch(createAction(actionTypes.SET_HIDE_LOADING));
    } catch (err) {
      console.log(err.response.data.content);
      dispatch(createAction(actionTypes.SET_HIDE_LOADING));
    }
  };
};

export const moiveDetailAction = (id) => {
  return async (dispatch) => {
    dispatch(createAction(actionTypes.SET_DISPLAY_LOADING));
    try {
      let res = await quanLyRap.layThongTinLichChieuPhim(id);
      await dispatch(
        createAction(actionTypes.SET_MOVIE_DETAIL, res.data.content)
      );
      dispatch(createAction(actionTypes.SET_HIDE_LOADING));
    } catch (err) {
      console.log(err.response.data.content);
      dispatch(createAction(actionTypes.SET_HIDE_LOADING));
    }
  };
};
