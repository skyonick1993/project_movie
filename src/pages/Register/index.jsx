import { useFormik } from "formik";
import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import { history } from "../../App";
import { quanLyUser } from "../../services/QuanLyUserService";
import * as Yup from "yup";
import { GROUPID, USER_LOGIN } from "../../util/settings/config";
import Swal from "sweetalert2";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const schema = Yup.object().shape({
  taiKhoan: Yup.string().required("* Vui lòng nhập tài khoản!"),
  matKhau: Yup.string()
    .required("* Vui lòng nhập mật khẩu!")
    .min(8, "* Mật khẩu phải từ 8 ký tự!"),
  confirmPassword: Yup.string()
    .required("* Vui lòng nhập lại mật khẩu!")
    .when("matKhau", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("matKhau")],
        "* Mật khẩu không trùng khớp!"
      ),
    }),
  email: Yup.string()
    .required("* Vui lòng nhập email!")
    .email("* Email không hợp lệ!"),
  soDt: Yup.string()
    .required("* Vui lòng nhập số điện thoại!")
    .matches("^[0-9]+$", "* Số điện thoại không hợp lệ!"),
  hoTen: Yup.string().required("* Vui lòng nhập họ tên!"),
});

const Register = (props) => {
  let [isShowPassword, setIsShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      confirmPassword: "",
      email: "",
      soDt: "",
      hoTen: "",
      maNhom: GROUPID,
    },
    validationSchema: schema,
    validateOnMount: true,
    onSubmit: async (formValue, ...props) => {
      console.log(formValue, ...props);
      let successAlert = `
      <div class="flex gap-3 justify-center">
        <div class="text-right">
          <span>Tài khoản: </span><br/>
          <span>Mật khẩu: </span><br/>
          <span>Họ tên: </span><br/>
          <span>Email: </span><br/>
          <span>Số điện thoại: </span>
        </div>
        <div class="text-left">
          <span>${formValue.taiKhoan}</span><br/>
          <span>${formValue.matKhau}</span><br/>
          <span>${formValue.hoTen}</span><br/>
          <span>${formValue.email}</span><br/>
          <span>${formValue.soDt}</span>
        </div>
      </div>`;
      try {
        let res = await quanLyUser.dangKy(formValue);
        await Swal.fire({
          icon: "success",
          title: "Đăng ký thành công!!!",
          html: successAlert,
        });
        localStorage.setItem(USER_LOGIN, JSON.stringify(res.data.content));
        history.push("/login");
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Đăng ký không thành công!!!",
          html: `<span class="text-red-500 font-medium">${err.response.data.content}</span>`,
        });
      }
    },
  });

  return (
    <Fragment>
      <div className="items-start w-1/4 py-3 bg-indigo-100 lg:bg-white flex justify-start lg:justify-start lg:px-12">
        <NavLink to="/home" className="cursor-pointer flex items-center">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-10 h-10 text-white p-2 bg-indigo-800 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="text-2xl text-indigo-800 hover:text-yellow-400 tracking-wide ml-2 font-semibold">
            Let's Movie
          </div>
        </NavLink>
      </div>
      <div className="w-1/2 py-3 xl:max-w-screen-sm">
        <div className="px-12 sm:px-24 md:px-48 lg:px-12 xl:px-24 xl:max-w-2xl">
          <h2
            className="text-center text-4xl text-indigo-900 font-display font-semibold xl:text-5xl
xl:text-bold"
          >
            Đăng ký
          </h2>
          <div className="mt-2">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Tài Khoản
                </div>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.taiKhoan}
                  name="taiKhoan"
                  className="w-full text-lg py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="text"
                  placeholder="Nhập vào tài khoản"
                />
                <span className="text-red-600 text-sm">
                  {formik.touched.taiKhoan && formik.errors.taiKhoan}
                </span>
              </div>
              <div className="mt-2">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Mật Khẩu
                  </div>
                </div>

                <div className="relative">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.matKhau}
                    name="matKhau"
                    className="w-full text-lg py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type={isShowPassword ? "text" : "password"}
                    placeholder="Nhập vào mật khẩu"
                  />
                  <button
                    onClick={() => setIsShowPassword(!isShowPassword)}
                    type="button"
                    className="text-xl absolute top-0 right-2"
                  >
                    {isShowPassword ? (
                      <EyeOutlined />
                    ) : (
                      <EyeInvisibleOutlined />
                    )}
                  </button>
                </div>

                <span className="text-red-600 text-sm">
                  {formik.touched.matKhau && formik.errors.matKhau}
                </span>
              </div>
              <div className="mt-2">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Nhập lại mật khẩu
                  </div>
                </div>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  name="confirmPassword"
                  className="w-full text-lg py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                />
                <span className="text-red-600 text-sm">
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword}
                </span>
              </div>
              <div className="mt-2">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Họ tên
                </div>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.hoTen}
                  name="hoTen"
                  className="w-full text-lg py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="text"
                  placeholder="Nhập vào họ tên"
                />
                <span className="text-red-600 text-sm">
                  {formik.touched.hoTen && formik.errors.hoTen}
                </span>
              </div>
              <div className="mt-2">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Email
                </div>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  name="email"
                  className="w-full text-lg py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="text"
                  placeholder="Nhập vào email"
                />
                <span className="text-red-600 text-sm">
                  {formik.touched.email && formik.errors.email}
                </span>
              </div>
              <div className="mt-2">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Số điện thoại
                </div>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.soDt}
                  name="soDt"
                  className="w-full text-lg py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="text"
                  placeholder="Nhập vào số điện thoại"
                />
                <span className="text-red-600 text-sm">
                  {formik.touched.soDt && formik.errors.soDt}
                </span>
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
            font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
            shadow-lg"
                >
                  Đăng ký
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
