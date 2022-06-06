import React, { useEffect, useState } from "react";
import { Tabs, Form, Input, Button } from "antd";
import { useFormik } from "formik";
import { GROUPID } from "../../util/settings/config";
import {
  getUserInfoAction,
  updateUserInfoAction,
} from "../../redux/actions/user";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import moment from "moment";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const { TabPane } = Tabs;

const Profile = (props) => {
  let dispatch = useDispatch();
  let [isUpdateUserInfo, setIsUpdateUserInfo] = useState(false);
  let { thongTinUser } = useSelector((state) => state.userReducer);
  let { thongTinDatVe } = thongTinUser;

  let formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: thongTinUser.taiKhoan,
      matKhau: thongTinUser.matKhau,
      hoTen: thongTinUser.hoTen,
      email: thongTinUser.email,
      soDt: thongTinUser.soDT,
      maLoaiNguoiDung: thongTinUser.maLoaiNguoiDung,
      maNhom: GROUPID,
    },
    onSubmit: async (values) => {
      dispatch(updateUserInfoAction(values, setIsUpdateUserInfo));
    },
  });

  useEffect(() => {
    dispatch(getUserInfoAction());
  }, [dispatch]);

  return (
    <div className="w-full h-screen text-black text-center">
      <div
        className="mt-20 pt-10"
        style={{
          backgroundImage: `url(/assets/bg-profile.jpg)`,
          minHeight: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-2/3 mx-auto card-container bg-gray-50 bg-opacity-95">
          <Tabs type="card">
            <TabPane
              tab={
                <span className="text-lg font-medium">Thông tin cá nhân</span>
              }
              key="1"
            >
              <Form
                onSubmitCapture={formik.handleSubmit}
                {...layout}
                name="register"
                className="w-3/4"
              >
                <Form.Item
                  name="taiKhoan"
                  label="Tài khoản"
                  className={isUpdateUserInfo && "text-left"}
                >
                  <span className="text-base font-semibold">
                    {formik.values.taiKhoan}
                  </span>
                </Form.Item>

                <Form.Item label="Mật khẩu">
                  {isUpdateUserInfo ? (
                    <Input.Password
                      onChange={formik.handleChange}
                      value={formik.values.matKhau}
                      name="matKhau"
                      placeholder="Nhập mật khẩu người dùng"
                    />
                  ) : (
                    <span className="text-base font-semibold">
                      {formik.values.matKhau}
                    </span>
                  )}
                </Form.Item>

                <Form.Item label="Họ tên">
                  {isUpdateUserInfo ? (
                    <Input
                      onChange={formik.handleChange}
                      value={formik.values.hoTen}
                      name="hoTen"
                      placeholder="Nhập họ tên người dùng"
                    />
                  ) : (
                    <span className="text-base font-semibold">
                      {formik.values.hoTen}
                    </span>
                  )}
                </Form.Item>

                <Form.Item label="Email">
                  {isUpdateUserInfo ? (
                    <Input
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      name="email"
                      placeholder="Nhập email người dùng"
                    />
                  ) : (
                    <span className="text-base font-semibold">
                      {formik.values.email}
                    </span>
                  )}
                </Form.Item>

                <Form.Item label="Số điện thoại">
                  {isUpdateUserInfo ? (
                    <Input
                      onChange={formik.handleChange}
                      value={formik.values.soDt}
                      name="soDt"
                      placeholder="Nhập số điện thoại người dùng"
                    />
                  ) : (
                    <span className="text-base font-semibold">
                      {formik.values.soDt}
                    </span>
                  )}
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  {isUpdateUserInfo ? (
                    <Button type="primary" htmlType="submit">
                      Cập nhật
                    </Button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsUpdateUserInfo(true);
                      }}
                      className="bg-gray-400 hover:bg-gray-800 duration-300 text-black text-base font-medium hover:text-white px-2.5 py-1 rounded"
                    >
                      Sửa thông tin
                    </button>
                  )}
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane
              tab={
                <span className="text-lg font-medium">Thông tin đặt vé</span>
              }
              key="2"
            >
              <div className="divide-y divide-gray-100 w-3/4 mx-auto overflow-auto h-96 mb-5">
                {thongTinDatVe?.map((item, index) => {
                  return (
                    <div key={index} className="p-4 flex space-x-4">
                      <img
                        src={item.hinhAnh}
                        alt={item.tenPhim}
                        className="flex-none w-36 h-40 rounded-lg object-cover "
                      />
                      <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
                        <h2 className="text-lg font-semibold text-black mb-0.5">
                          {item.tenPhim}
                        </h2>
                        <div className="flex flex-wrap text-left text-sm font-medium whitespace-pre ">
                          <div className="flex flex-wrap w-4/5 mx-auto">
                            <p> - Thời lượng: {item.thoiLuongPhim} phút</p>
                            <p>
                              {" "}
                              - Ngày đặt:{" "}
                              {moment(item.ngayDat).format(
                                "DD/MM/YYYY - Giờ đặt: hh:mm"
                              )}
                            </p>
                            <p>
                              {" "}
                              - Địa điểm: {
                                item.danhSachGhe[0].tenHeThongRap
                              } - {item.danhSachGhe[0].tenRap}
                            </p>
                            <p>
                              {" "}
                              - Số ghế đã đặt:
                              {item.danhSachGhe.map(
                                (itemGhe) => " | " + itemGhe.tenGhe + " | "
                              )}
                            </p>
                          </div>
                          <div className="absolute top-0 right-0 rounded-full bg-yellow-100 text-yellow-900 px-2 py-0.5 hidden sm:flex lg:hidden xl:flex items-center space-x-1">
                            <div className="text-yellow-500">
                              <svg width="16" height="20" fill="currentColor">
                                <path d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z" />
                              </svg>
                            </div>
                            <span className="font-semibold">{5}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
