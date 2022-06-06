import { createAction } from ".";
import { history } from "../../App";
import { quanLyPhim } from "../../services/QuanLyPhimService";
import { actionTypes } from "../types/actionType";

export const filmManagementAction = (keyword = "") => {
  return async (dispatch) => {
    dispatch(createAction(actionTypes.SET_DISPLAY_LOADING));
    try {
      let res = await quanLyPhim.layDanhSachPhim(keyword);
      await dispatch(
        createAction(actionTypes.SET_MOVIE_LIST, res.data.content)
      );
      dispatch(createAction(actionTypes.SET_HIDE_LOADING));
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data.content);
      dispatch(createAction(actionTypes.SET_HIDE_LOADING));
    }
  };
};

export const addFilmAction = (formData) => {
  return async (dispatch) => {
    try {
      let res = await quanLyPhim.themPhimUpLoadHinh(formData);
      console.log(res.data.content);
      alert("Thêm phim thành công");
      dispatch(filmManagementAction());
      history.push("/admin/films");
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data.content);
    }
  };
};

export const getFilmInfo = (maPhim) => {
  return async (dispatch) => {
    try {
      let res = await quanLyPhim.layThongTinPhim(maPhim);
      console.log(res.data.content);
      dispatch(createAction(actionTypes.SET_FILM_INFO, res.data.content));
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const updateFilmAction = (formData) => {
  return async (dispatch) => {
    try {
      let res = await quanLyPhim.capNhatPhimUpLoadHinh(formData);
      console.log(res.data.content);
      alert("Cập nhật thành công");
      dispatch(filmManagementAction());
      history.push("/admin/films");
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data.content);
    }
  };
};

export const deleteFilmAction = (maPhim) => {
  return async (dispatch) => {
    try {
      let res = await quanLyPhim.xoaPhim(maPhim);
      console.log(res.data.content);
      alert("Xóa phim thành công!");
      dispatch(filmManagementAction());
    } catch (err) {
      console.log(err.response.data.content);
    }
  };
};
