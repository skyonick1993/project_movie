import { createAction } from ".";
import { history } from "../../App";
import { quanLyUser } from "../../services/QuanLyUserService";
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { actionTypes } from "../types/actionType";
import Swal from "sweetalert2";

export const loginAction = (userForm) => {
  return async (dispatch) => {
    try {
      let res = await quanLyUser.dangNhap(userForm);
      dispatch(createAction(actionTypes.SET_USER_LOGIN, res.data.content));
      localStorage.setItem(TOKEN, res.data.content.accessToken);
      localStorage.setItem(USER_LOGIN, JSON.stringify(res.data.content));
      await Swal.fire({
        position: "mid-center",
        icon: "success",
        title: "Đăng nhập thành công!!!",
        showConfirmButton: false,
        timer: 1000,
      });
      history.push("/home");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Đăng nhập không thành công!!!",
        html: `<span class="text-red-500 font-medium">${err.response.data.content}</span>`,
      });
    }
  };
};

export const getUserInfoAction = () => {
  return async (dispatch) => {
    dispatch(createAction(actionTypes.SET_DISPLAY_LOADING));
    try {
      let res = await quanLyUser.layThongTinUser();
      await dispatch(createAction(actionTypes.SET_USER_INFO, res.data.content));
      dispatch(createAction(actionTypes.SET_HIDE_LOADING));
    } catch (err) {
      console.log(err.response.data?.content);
      dispatch(createAction(actionTypes.SET_HIDE_LOADING));
    }
  };
};

export const getUsernameInfoAction = (taiKhoan) => {
  return async (dispatch) => {
    dispatch(createAction(actionTypes.SET_DISPLAY_LOADING));
    try {
      let res = await quanLyUser.layThongTinUsernames(taiKhoan);
      await dispatch(
        createAction(actionTypes.SET_USERNAMES_INFO, res.data.content)
      );
      dispatch(createAction(actionTypes.SET_HIDE_LOADING));
    } catch (err) {
      console.log(err.response.data);
      dispatch(createAction(actionTypes.SET_HIDE_LOADING));
    }
  };
};

export const getUserList = (keyword = "") => {
  return async (dispatch) => {
    dispatch(createAction(actionTypes.SET_DISPLAY_LOADING));
    try {
      let res = await quanLyUser.layDanhSachUser(keyword);
      await dispatch(createAction(actionTypes.SET_USER_LIST, res.data.content));
      console.log(res.data.content);
      dispatch(createAction(actionTypes.SET_HIDE_LOADING));
    } catch (err) {
      console.log(err.response.data.content);
      dispatch(createAction(actionTypes.SET_HIDE_LOADING));
    }
  };
};

export const deleteUserAction = (taiKhoan) => {
  return async (dispatch) => {
    dispatch(createAction(actionTypes.SET_DISPLAY_LOADING));
    try {
      let res = await quanLyUser.xoaUser(taiKhoan);
      await dispatch(getUserList());
      alert(res.data.content);
      dispatch(createAction(actionTypes.SET_HIDE_LOADING));
    } catch (err) {
      alert(err.response.data?.content);
      dispatch(createAction(actionTypes.SET_HIDE_LOADING));
    }
  };
};

export const addUserAction = (userForm) => {
  return async (dispatch) => {
    dispatch(createAction(actionTypes.SET_DISPLAY_LOADING));
    try {
      let res = await quanLyUser.themUser(userForm);
      console.log(res.data.content);
      alert("Thêm user thành công!");
      history.push("/admin/users");
      dispatch(createAction(actionTypes.SET_HIDE_LOADING));
    } catch (err) {
      alert(err.response.data?.content);
      dispatch(createAction(actionTypes.SET_HIDE_LOADING));
    }
  };
};

export const updateUserAction = (userForm) => {
  return async (dispatch) => {
    dispatch(createAction(actionTypes.SET_DISPLAY_LOADING));
    try {
      let res = await quanLyUser.capNhatThongTinUser(userForm);
      console.log(res.data.content);
      alert("Cập nhật thành công!");
      dispatch(createAction(actionTypes.SET_HIDE_LOADING));
    } catch (err) {
      // console.log(err.response.data);
      dispatch(createAction(actionTypes.SET_HIDE_LOADING));
    }
  };
};

export const updateUserInfoAction = (userForm, setIsUpdateUserInfo) => {
  return async (dispatch) => {
    dispatch(createAction(actionTypes.SET_DISPLAY_LOADING));
    try {
      let res = await quanLyUser.capNhatThongTinUsername(userForm);
      console.log(res.data.content);
      dispatch(createAction(actionTypes.SET_HIDE_LOADING));
      await Swal.fire({
        position: "mid-center",
        icon: "success",
        title: "Cập nhật thành công!!!",
        showConfirmButton: false,
        timer: 1000,
      });
      setIsUpdateUserInfo(false);
    } catch (err) {
      dispatch(createAction(actionTypes.SET_HIDE_LOADING));
      Swal.fire({
        icon: "error",
        title: "Cập nhật không thành công!!!",
        html: `<span class="text-red-500 font-medium">${err.response.data.content}</span>`,
      });
    }
  };
};
