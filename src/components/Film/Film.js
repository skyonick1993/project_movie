import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { PlayCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import "./Style.css";
import { useDispatch } from "react-redux";
import { createAction } from "../../redux/actions";
import { actionTypes } from "../../redux/types/actionType";

const Film = (props) => {
  let dispatch = useDispatch();
  let { maPhim, tenPhim, hinhAnh, danhGia, hot, ngayKhoiChieu, trailer } =
    props.film;

  return (
    <div className="p-3">
      <div className="h-full bg-gray-800 bg-opacity-40 rounded-lg overflow-hidden text-center relative">
        <div className="movie__item__poster rounded-lg overflow-hidden relative">
          <img
            className="w-full block sm:h-40 md:h-60 lg:h-64"
            src={hinhAnh}
            alt={tenPhim}
          />
          <div className="movie__item__poster__content absolute text-white w-3/4 text-center">
            <button
              onClick={() => {
                console.log(trailer);
                let isPlayTrailer = {
                  isDisplay: true,
                  trailer: trailer,
                };
                dispatch(
                  createAction(actionTypes.SET_TRAILER_PLAY, isPlayTrailer)
                );
              }}
            >
              <PlayCircleOutlined className="text-5xl mb-2" />
            </button>
            <p>Khởi chiếu: {moment(ngayKhoiChieu).format("DD/MM/YYYY")}</p>
          </div>
        </div>
        <h1 className="h-14 title-font md:text-lg text-lg font-medium text-white my-2 px-1">
          {tenPhim}
        </h1>
        <div className="flex justify-center">
          <NavLink
            to={`/detail/${maPhim}/${danhGia}`}
            className="w-full bg-gray-400 hover:bg-gray-800 duration-300 text-black text-base font-semibold hover:text-white px-4 py-2 rounded-lg"
          >
            Đặt vé
          </NavLink>
          <div className="absolute top-2 right-2 rounded-full bg-yellow-100 text-yellow-900 px-2 py-0.5 hidden sm:flex lg:hidden xl:flex items-center space-x-1">
            <div className="text-yellow-500">
              <svg width="16" height="20" fill="currentColor">
                <path d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z" />
              </svg>
            </div>
            <span className="font-semibold">{danhGia / 2}</span>
          </div>
          {hot && (
            <div className="absolute top-1 left-1 rounded-full bg-gray-100 text-red-600 px-2 py-2 hidden sm:flex lg:hidden xl:flex items-center space-x-1">
              <span className="font-semibold">Hot</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Film);
