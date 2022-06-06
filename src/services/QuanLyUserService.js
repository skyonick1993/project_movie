import { GROUPID } from "../util/settings/config";
import BaseService from "./BaseService";

export class QuanLyUserService extends BaseService {
  constructor(props) {
    super();
  }

  dangNhap = (userForm) => {
    return this.post("/api/QuanLyNguoiDung/DangNhap", userForm);
  };

  dangKy = (userForm) => {
    return this.post("/api/QuanLyNguoiDung/DangKy", userForm);
  };

  layThongTinUser = () => {
    return this.post("/api/QuanLyNguoiDung/ThongTinTaiKhoan");
  };

  layThongTinUsernames = (taiKhoan) => {
    return this.post(
      `/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`
    );
  };

  capNhatThongTinUser = (userForm) => {
    return this.post("/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung", userForm);
  };

  capNhatThongTinUsername = (userForm) => {
    return this.put("/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung", userForm);
  };

  themUser = (userForm) => {
    return this.post("/api/QuanLyNguoiDung/ThemNguoiDung", userForm);
  };

  xoaUser = (taiKhoan) => {
    return this.delete(
      `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
    );
  };

  layDanhSachUser = (keyword = "") => {
    return this.get(
      `/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}${
        keyword && "&tuKhoa=" + keyword
      }`
    );
  };
}

export const quanLyUser = new QuanLyUserService();
