import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import "../../assets/styles/circle.scss";
import { useDispatch } from "react-redux";
import { moiveDetailAction } from "../../redux/actions/cinema";
import moment from "moment";
import { Tabs } from "antd";
import { Rate } from "antd";
import { NavLink } from "react-router-dom";

const { TabPane } = Tabs;

const Detail = (props) => {
  let dispatch = useDispatch();
  let { chiTietPhim } = useSelector((state) => state.movieList);

  useEffect(() => {
    dispatch(moiveDetailAction(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  return (
    <div
      className="mt-20"
      style={{
        backgroundImage: `url(${chiTietPhim.hinhAnh})`,
        minHeight: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <CustomCard
        style={{ minHeight: "100vh" }}
        effectColor="#000" // required
        color="#000" // default color is white
        blur={15} // default blur value is 10px
        borderRadius="0" // default border radius value is 10px
      >
        <div className="grid grid-cols-12">
          <div className="col-span-3 col-start-2">
            <img
              className="w-full sm:h-40 md:h-60 lg:h-96"
              src={chiTietPhim.hinhAnh}
              alt={chiTietPhim.tenPhim}
            />
          </div>
          <div className="col-span-5 col-start-5 text-white self-center ml-5">
            <p className="mb-0 text-lg text-black font-semibold">
              Ngày khởi chiếu:{" "}
              {moment(chiTietPhim.ngayKhoiChieu).format("DD.MM.YYYY")}
            </p>
            <p className="text-2xl my-1 font-semibold text-yellow-400">
              {chiTietPhim.tenPhim}
            </p>
            <p className="mb-6">{chiTietPhim.moTa}</p>
            <div>
              <a
                href="#showtime"
                className="bg-gray-400 hover:bg-gray-800 duration-300 text-black text-lg font-semibold hover:text-white px-4 py-2"
              >
                Chọn suất chiếu
              </a>
            </div>
          </div>
          <div className="col-span-2 col-start-10 self-center ml-auto">
            <div>
              <Rate allowHalf defaultValue={props.match.params.rating / 2} />
            </div>
            <div
              className={`c100 p${props.match.params.rating * 10} green`}
              style={{ marginLeft: "7px" }}
            >
              <span>{props.match.params.rating / 2}</span>
              <div className="slice">
                <div className="bar" />
                <div className="fill" />
              </div>
            </div>
          </div>
        </div>

        <div id="showtime" className="container w-4/5 mx-auto">
          <Tabs defaultActiveKey="1" centered>
            <TabPane
              tab={
                <button className="text-xl opacity-60 hover:opacity-100 focus:opacity-100 text-white font-medium">
                  Lịch Chiếu
                </button>
              }
              key="1"
            >
              <div className="w-5/6 mx-auto bg-white py-5">
                <Tabs tabPosition={"left"}>
                  {chiTietPhim.heThongRapChieu?.map((item, index) => {
                    return (
                      <TabPane
                        tab={
                          <button className="opacity-50 hover:opacity-100 focus:opacity-100">
                            <img
                              className="w-12"
                              src={item.logo}
                              alt={item.maHeThongRap}
                            />
                          </button>
                        }
                        key={index + 1}
                      >
                        {item.cumRapChieu?.map((item, index) => {
                          return (
                            <div key={index} className="my-3">
                              <div className="flex">
                                <img
                                  className="w-12"
                                  src={item.hinhAnh}
                                  alt={item.maCumRap}
                                />
                                <div className="mx-2">
                                  <span className="text-green-600 text-base font-semibold">
                                    {item.tenCumRap}
                                  </span>
                                  <br />
                                  <span className="text-black text-base font-medium">
                                    {item.diaChi}
                                  </span>
                                </div>
                              </div>
                              <div className="grid grid-cols-5 mt-2">
                                {item.lichChieuPhim
                                  ?.slice(0, 10)
                                  .map((item, index) => {
                                    return (
                                      <NavLink
                                        to={`/checkout/${item.maLichChieu}`}
                                        key={index}
                                        className="col-span-1 text-blue-500 font-bold"
                                      >
                                        {moment(item.ngayChieuGioChieu).format(
                                          "hh:mm A"
                                        )}
                                      </NavLink>
                                    );
                                  })}
                              </div>
                            </div>
                          );
                        })}
                      </TabPane>
                    );
                  })}
                </Tabs>
              </div>
            </TabPane>
            <TabPane
              tab={
                <button className="text-xl opacity-60 hover:opacity-100 focus:opacity-100 text-white font-medium">
                  Thông Tin
                </button>
              }
              key="2"
            >
              <div className="w-5/6 mx-auto bg-white py-5"></div>
            </TabPane>
            <TabPane
              tab={
                <button className="text-xl opacity-60 hover:opacity-100 focus:opacity-100 text-white font-medium">
                  Đánh Giá
                </button>
              }
              key="3"
            >
              <div className="w-5/6 mx-auto bg-white py-5"></div>
            </TabPane>
          </Tabs>
        </div>
      </CustomCard>
    </div>
  );
};

export default Detail;
