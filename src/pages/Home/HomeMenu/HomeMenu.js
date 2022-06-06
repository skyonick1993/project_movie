import React from "react";
import { Tabs } from "antd";
import { NavLink } from "react-router-dom";
import moment from "moment";

const { TabPane } = Tabs;

const HomeMenu = (props) => {
  return (
    <div className="container mx-auto">
      <Tabs tabPosition={"left"}>
        {props.heThongRapChieu?.map((item, index) => {
          return (
            <TabPane
              tab={<img className="w-12" src={item.logo} alt="icon1" />}
              key={index + 1}
            >
              <Tabs tabPosition={"left"}>
                {item.lstCumRap?.slice(0, 6).map((i, ind) => {
                  return (
                    <TabPane
                      tab={
                        <div className="flex items-center">
                          <img className="w-12" src={i.hinhAnh} alt="icon1" />
                          <div className="text-white text-left pl-2 w-96">
                            <span className="text-green-300">
                              {i.tenCumRap}
                            </span>
                            <br />
                            <span>{i.diaChi}</span>
                          </div>
                        </div>
                      }
                      key={ind + 1}
                    >
                      {i.danhSachPhim?.slice(0, 4).map((film) => {
                        return (
                          <div
                            key={film.maPhim}
                            className="mb-4 flex text-white border-b border-gray-600 pb-4"
                          >
                            <img
                              className="w-16 h-18 mr-4"
                              src={film.hinhAnh}
                              alt={film.tenPhim}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://picsum.photos/256/288";
                              }}
                            />
                            <div>
                              <p className="text-lg mb-0">{film.tenPhim}</p>
                              <div className="grid grid-cols-5 gap-2">
                                {film.lstLichChieuTheoPhim
                                  ?.slice(0, 10)
                                  .map((item, index) => {
                                    return (
                                      <NavLink
                                        key={index}
                                        to={`/checkout/${item.maLichChieu}`}
                                      >
                                        {moment(item.ngayChieuGioChieu).format(
                                          "hh:mm A"
                                        )}
                                      </NavLink>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </TabPane>
                  );
                })}
              </Tabs>
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

export default HomeMenu;
