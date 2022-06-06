import _ from "lodash";
import { UserOutlined, TeamOutlined, HomeOutlined } from "@ant-design/icons";
import React, { Fragment, memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAction } from "../../redux/actions";
import {
  bookingAction,
  bookingSeatAction,
  bookingTicketAction,
} from "../../redux/actions/booking";
import { actionTypes } from "../../redux/types/actionType";
import style from "./Checkout.module.css";
import { Tabs } from "antd";
import { getUserInfoAction } from "../../redux/actions/user";
import moment from "moment";
import { connection } from "../..";
import { NavLink } from "react-router-dom";
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { history } from "../../App";
import Swal from "sweetalert2";

const { TabPane } = Tabs;

const Payment = memo((props) => {
  let dispatch = useDispatch();
  let { userLogin } = useSelector((state) => state.userReducer);
  let { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } = useSelector(
    (state) => state.bookingReducer
  );
  let { danhSachGhe, thongTinPhim } = chiTietPhongVe;

  let datGhe = useCallback(
    (ghe) => {
      let cloneDanhSachGheDangDat = [...danhSachGheDangDat];
      let foundIndex = cloneDanhSachGheDangDat.findIndex(
        (item) => item.maGhe === ghe.maGhe
      );
      if (foundIndex === -1) cloneDanhSachGheDangDat.push(ghe);
      else cloneDanhSachGheDangDat.splice(foundIndex, 1);
      dispatch(
        bookingSeatAction(cloneDanhSachGheDangDat, props.match.params.id)
      );
    },
    [danhSachGheDangDat, dispatch, props.match.params.id]
  );

  let datVe = useCallback(() => {
    let formDanhSachVe = {
      maLichChieu: props.match.params.id,
      danhSachVe: danhSachGheDangDat,
    };
    if (_.isEmpty(danhSachGheDangDat))
      return Swal.fire({
        icon: "warning",
        title: "Bạn chưa chọn ghế!",
      });
    dispatch(bookingTicketAction(formDanhSachVe));
  }, [danhSachGheDangDat, dispatch, props.match.params.id]);

  useEffect(() => {
    dispatch(bookingAction(props.match.params.id));
    connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
      dsGheKhachDat = dsGheKhachDat.filter(
        (item) => item.taiKhoan !== userLogin.taiKhoan
      );
      let arrGheKhachDat = dsGheKhachDat.reduce((total, item, index) => {
        let arrGhe = JSON.parse(item.danhSachGhe);
        return [...total, ...arrGhe];
      });
      arrGheKhachDat = _.uniqBy(arrGheKhachDat, "maGhe");
      dispatch(createAction(actionTypes.SET_SEAT_USER, arrGheKhachDat));
    });
  }, [dispatch, props.match.params.id, userLogin.taiKhoan]);

  return (
    <div className="container">
      <div className="grid grid-cols-10">
        <div className="col-span-7 col-start-1">
          <div>
            <div className="bg-black h-2 mx-10"></div>
            <div className={`${style.trapezoid} mx-auto text-center`}>
              <h3 className="pt-1">Màn hình</h3>
            </div>
          </div>
          <div className="text-center mt-5">
            {danhSachGhe.map((item, index) => {
              let i = "";
              let isBooking =
                danhSachGheDangDat.findIndex(
                  (gheDangDat) => item.maGhe === gheDangDat.maGhe
                ) !== -1;
              let isKhachBooking =
                danhSachGheKhachDat.findIndex(
                  (gheKhachDat) => gheKhachDat.maGhe === item.maGhe
                ) !== -1;
              if (item.loaiGhe === "Vip") i = style.gheVip;
              if (item.daDat) i = style.gheDaDat;
              if (isBooking) i = style.gheDangDat;
              if (isKhachBooking) i = style.gheKhachDat;
              if (item.taiKhoanNguoiDat === userLogin.taiKhoan)
                i = style.gheMoiDat;

              return (
                <Fragment key={index}>
                  <button
                    onClick={() => datGhe(item)}
                    className={style.ghe + " " + i}
                  >
                    {item.daDat ? (
                      item.taiKhoanNguoiDat === userLogin.taiKhoan ? (
                        <UserOutlined />
                      ) : (
                        "X"
                      )
                    ) : isKhachBooking ? (
                      <TeamOutlined />
                    ) : (
                      item.stt
                    )}
                  </button>
                  {(index + 1) % 16 === 0 && <br />}
                </Fragment>
              );
            })}
          </div>
          <div className="flex w-4/5 mx-auto font-medium justify-center mt-2">
            <div className={style.noteGhe}>
              Ghế chưa đặt
              <div
                className={style.ghe}
                style={{ marginLeft: "auto", marginRight: "auto" }}
              ></div>
            </div>
            <div className={style.noteGhe}>
              Ghế bạn đang đặt
              <div
                className={style.ghe + " " + style.gheDangDat}
                style={{ marginLeft: "auto", marginRight: "auto" }}
              ></div>
            </div>
            <div className={style.noteGhe}>
              Ghế Vip Pro
              <div
                className={style.ghe + " " + style.gheVip}
                style={{ marginLeft: "auto", marginRight: "auto" }}
              ></div>
            </div>
            <div className={style.noteGhe}>
              Ghế đã đặt
              <div
                className={
                  style.ghe + " text-center leading-9 " + style.gheDaDat
                }
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                X
              </div>
            </div>
            <div className={style.noteGhe}>
              Ghế bạn đã đặt
              <div
                className={style.ghe + " text-center " + style.gheMoiDat}
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <UserOutlined />
              </div>
            </div>
            <div className={style.noteGhe}>
              Ghế khách đặt
              <div
                className={style.ghe + " text-center " + style.gheKhachDat}
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <TeamOutlined />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="w-4/5">
            <div>
              <h3 className="text-green-400 text-center text-2xl">
                {danhSachGheDangDat
                  .reduce((total, item, index) => {
                    return (total += item.giaVe);
                  }, 0)
                  .toLocaleString()}{" "}
                đ
              </h3>
              <hr />
              <h3 className="text-xl my-2">{thongTinPhim.tenPhim}</h3>
              <span className="font-normal text-base text-black">
                Địa điểm: {thongTinPhim.diaChi}
              </span>
              <br />
              <span className="font-normal text-base text-black">
                Ngày chiếu: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}{" "}
                {thongTinPhim.tenRap}
              </span>
            </div>
            <hr />
            <div className="flex justify-between my-2">
              <div>
                <span className="text-red-600 text-lg">Ghế:</span>
                {_.sortBy(danhSachGheDangDat, ["stt"]).map((item) => {
                  return (
                    <span key={item.maGhe} className="text-lg font-medium">
                      {" "}
                      {item.stt}
                    </span>
                  );
                })}
              </div>
              <div>
                <span className="text-green-400 text-lg">
                  {danhSachGheDangDat
                    .reduce((total, item, index) => {
                      return (total += item.giaVe);
                    }, 0)
                    .toLocaleString()}
                  đ
                </span>
              </div>
            </div>
            <hr />
            <div className=" my-2">
              <div>
                <span className="font-normal text-gray-500">E-Mail</span>
              </div>
              <div>
                <span className="text-base font-medium">{userLogin.email}</span>
              </div>
            </div>
            <hr />
            <div className=" my-2">
              <div>
                <span className="font-normal text-gray-500">Phone</span>
              </div>
              <div>
                <span className="text-base font-medium">{userLogin.soDT}</span>
              </div>
            </div>
            <hr />
            <div className=" my-2">
              <div>
                <span className="font-normal text-gray-500">Mã giảm giá</span>
              </div>
              <div>
                <span className="text-base font-medium">Nhập tại đây...</span>
              </div>
            </div>
            <hr />
            <div className=" my-2">
              <div>
                <span className="text-base font-medium">
                  Hình thức thanh toán
                </span>
              </div>
              <div>
                <span className="font-normal text-red-600">
                  Vui lòng chọn ghế để hiển thị phương thức thanh toán phù hợp
                </span>
              </div>
            </div>
            <div className="mt-auto flex justify-center items-end">
              <button
                onClick={datVe}
                className="btn-purple w-full"
                style={{ marginLeft: 0, marginRight: 0 }}
              >
                Đặt vé
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const Checkout = (props) => {
  let { tabActive } = useSelector((state) => state.bookingReducer);
  let { userLogin } = useSelector((state) => state.userReducer);
  let dispatch = useDispatch();

  const operations = useCallback(() => {
    return (
      <Fragment>
        {!_.isEmpty(userLogin) && (
          <div className="text-base font-medium flex gap-3">
            <NavLink className="flex items-center" to="/home">
              <HomeOutlined className="text-xl" />
            </NavLink>{" "}
            <div>
              <NavLink to="/profile">{userLogin.taiKhoan}</NavLink>{" "}
              <button
                className="text-base font-medium text-gray-900 hover:text-gray-500 "
                type="button"
                onClick={() => {
                  localStorage.removeItem(USER_LOGIN);
                  localStorage.removeItem(TOKEN);
                  history.push("/home");
                  window.location.reload();
                }}
              >
                Đăng xuất
              </button>
            </div>
          </div>
        )}
      </Fragment>
    );
  }, [userLogin]);

  return (
    <div className="mx-5">
      <Tabs
        tabBarExtraContent={operations()}
        defaultActiveKey="1"
        activeKey={tabActive}
        onChange={(key) => {
          dispatch(createAction(actionTypes.SET_KEY_TAB, `${key}`));
        }}
      >
        <TabPane
          tab={
            <span className="text-base font-medium">
              01 CHỌN GHẾ & THANH TOÁN
            </span>
          }
          key="1"
        >
          <Payment {...props} />
        </TabPane>
        <TabPane
          tab={<span className="text-base font-medium">02 LỊCH SỬ ĐẶT VÉ</span>}
          key="2"
        >
          <KetQuaDatVe {...props} />
        </TabPane>
      </Tabs>
    </div>
  );
};

const KetQuaDatVe = memo((props) => {
  let dispatch = useDispatch();
  let { thongTinUser } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(getUserInfoAction());
  }, [dispatch]);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 mx-auto">
        <div className="flex flex-col text-center w-full">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Lịch sử đặt vé
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-black font-medium">
            Tài khoản: {thongTinUser.taiKhoan} - Họ tên: {thongTinUser.hoTen} -
            Email: {thongTinUser.email} - Số điện thoại: {thongTinUser.soDT}
          </p>
        </div>
        <div className="flex flex-wrap -m-2">
          {thongTinUser.thongTinDatVe?.map((item, index) => {
            return (
              <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                  <img
                    alt={item.tenPhim}
                    className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                    src={item.hinhAnh}
                  />
                  <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">
                      {item.tenPhim}
                    </h2>
                    <span className="text-gray-500">
                      Ngày giờ đặt:{" "}
                      {moment(item.ngayDat).format("DD-MM-YYYY h:mmA")}{" "}
                    </span>
                    <br />
                    <span className="text-gray-500">
                      Địa điểm: {item.danhSachGhe[0].tenHeThongRap}
                      {" | "}
                      {item.danhSachGhe[0].tenRap}
                    </span>
                    <br />
                    <span className="text-gray-500">
                      Số ghế:{item.danhSachGhe.map((i) => " " + i.tenGhe)}{" "}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default Checkout;
