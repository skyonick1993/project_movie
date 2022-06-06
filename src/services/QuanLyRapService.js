import { GROUPID } from "../util/settings/config";
import BaseService from "./BaseService";

export class QuanLyRapService extends BaseService {
  constructor(props) {
    super();
  }

  layThongTinLichChieu() {
    return this.get(
      `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`
    );
  }

  layThongTinLichChieuPhim(maPhim) {
    return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);
  }

  layThongTinHeThongRap() {
    return this.get(`/api/QuanLyRap/LayThongTinHeThongRap`);
  }

  layThongTinCumRap(maHeThongRap) {
    return this.get(
      `/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
    );
  }

  taoLichChieu(thongTinLichChieu) {
    return this.post("/api/QuanLyDatVe/TaoLichChieu", thongTinLichChieu);
  }
}

export const quanLyRap = new QuanLyRapService();
