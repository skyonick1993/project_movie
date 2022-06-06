import { GROUPID } from "../util/settings/config";
import BaseService from "./BaseService";

export class QuanLyPhimService extends BaseService {
  constructor(props) {
    super();
  }

  layDanhSachBanner = () => {
    return this.get("/api/QuanLyPhim/LayDanhSachBanner");
  };

  layDanhSachPhim = (keyword = "") => {
    return this.get(
      `/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}${
        keyword && "&tenPhim=" + keyword
      }`
    );
  };

  themPhimUpLoadHinh = (formData) => {
    return this.post("/api/QuanLyPhim/ThemPhimUploadHinh", formData);
  };

  capNhatPhimUpLoadHinh = (formData) => {
    return this.post("/api/QuanLyPhim/CapNhatPhimUpload", formData);
  };

  layThongTinPhim = (maPhim) => {
    return this.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
  };

  xoaPhim = (maPhim) => {
    return this.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
  };
}

export const quanLyPhim = new QuanLyPhimService();
