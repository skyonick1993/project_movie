import BaseService from "./BaseService";

export class QuanLyDatVeService extends BaseService {
  constructor(props) {
    super();
  }

  layChiTietPhongVe = (maLichChieu) => {
    return this.get(
      `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );
  };

  datVe = (thongTinDatVe) => {
    return this.post("/api/QuanLyDatVe/DatVe", thongTinDatVe);
  };
}

export const quanLyDatVe = new QuanLyDatVeService();
