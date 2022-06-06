import { actionTypes } from "../types/actionType";

let initialState = {
  danhSachPhim: [
    {
      maPhim: 5031,
      tenPhim: "The Croods: New Ag1",
      biDanh: "the-croods-new-ag1",
      trailer: "https://www.youtube.com/watch?v=0qaStyeKpLo&feature=emb_logo",
      hinhAnh:
        "https://movienew.cybersoft.edu.vn/hinhanh/the-croods-new-age_gp01.jpg",
      moTa: "Sinh tồn trong một thế giới tiền sử luôn rình rập hiểm nguy từ đủ loài quái thú hung dữ cho tới thảm họa ngày tận thế, Nhà Croods chưa từng một lần chùn bước. Nhưng giờ đây họ sẽ phải đối mặt với thử thách lớn nhất từ trước tới nay: chung sống với một gia đình khác. Để tìm kiếm một mái nhà an toàn hơn, Nhà Croods bắt đầu hành trình khám phá thế giới tiến tới những vùng đất xa xôi đầy tiềm năng. Một ngày nọ, họ tình cờ lạc vào một nơi yên bình có đầy đủ mọi tiện nghi hiện đại và biệt lập với tường vây bao quanh. Tưởng rằng mọi vấn đề trong cuộc sống sẽ được giải quyết thì Nhà Croods lại phải chấp nhận với sự thật rằng đã có một gia đình khác định cư ở đây đó chính là Nhà Bettermans.",
      maNhom: "GP01",
      ngayKhoiChieu: "2021-09-26T00:00:00",
      danhGia: 10,
      hot: false,
      dangChieu: true,
      sapChieu: false,
    },
  ],
  chiTietPhim: {},
  thongTinPhim: {},
  isPlayTrailer: {
    isDisplay: false,
    trailer: "",
  },
};

export const movieList = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_MOVIE_LIST:
      state.danhSachPhim = payload;
      return { ...state };
    case actionTypes.SET_MOVIE_DETAIL:
      state.chiTietPhim = payload;
      return { ...state };
    case actionTypes.SET_FILM_INFO:
      state.thongTinPhim = payload;
      return { ...state };
    case actionTypes.SET_TRAILER_PLAY:
      state.isPlayTrailer = payload;
      return { ...state };
    default:
      return state;
  }
};
