import { createAction } from ".";
// import { connection } from "../..";
import { quanLyDatVe } from "../../services/QuanLyDatVeService";
import { actionTypes } from "../types/actionType";
import { getUserInfoAction } from "./user";
import Swal from "sweetalert2";

export const bookingAction = (maLichChieu) => {
  return async (dispatch) => {
    try {
      let res = await quanLyDatVe.layChiTietPhongVe(maLichChieu);
      dispatch(createAction(actionTypes.SET_BOOKING_INFO, res.data.content));
    } catch (err) {
      console.log(err);
    }
  };
};

export const bookingTicketAction = (thongTinDatVe) => {
  return async (dispatch) => {
    dispatch(createAction(actionTypes.SET_DISPLAY_LOADING));
    try {
      let res = await quanLyDatVe.datVe(thongTinDatVe);
      console.log(res.data.content);
      await dispatch(bookingAction(thongTinDatVe.maLichChieu));
      await dispatch(getUserInfoAction());
      await dispatch(createAction(actionTypes.SET_COMPLETED_BOOKING));
      dispatch(createAction(actionTypes.SET_HIDE_LOADING));
      Swal.fire({
        icon: "success",
        title: "Đặt vé thành công!",
        html: `<span class="text-lg font-medium text-blue-600">Xem lịch sử đặt vé?</span>`,
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonText: "Yes",
      }).then((result) => {
        result.isConfirmed &&
          dispatch(createAction(actionTypes.SET_KEY_TAB, "2"));
      });
    } catch (err) {
      dispatch(createAction(actionTypes.SET_HIDE_LOADING));
      console.log(err.response);
      Swal.fire({
        icon: "error",
        title: "Đặt vé thất bại!",
      });
    }
  };
};

export const bookingSeatAction = (dsGheDangDat, maLichChieu) => {
  return async (dispatch, getState) => {
    await dispatch(createAction(actionTypes.SET_ITEM_INFO, dsGheDangDat));
    // let danhSachGheDangDat = getState().bookingReducer.danhSachGheDangDat;
    // let taiKhoan = getState().userReducer.userLogin.taiKhoan;
    // danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);
    // connection.invoke("datGhe", taiKhoan, danhSachGheDangDat, maLichChieu);
  };
};
