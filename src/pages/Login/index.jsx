import React, { useState } from "react";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/actions/user";
import * as Yup from "yup";
import { USER_LOGIN } from "../../util/settings/config";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const schema = Yup.object().shape({
  taiKhoan: Yup.string().required("* Vui lòng nhập tài khoản!"),
  matKhau: Yup.string().required("* Vui lòng nhập mật khẩu!"),
});

const Login = (props) => {
  let dispatch = useDispatch();
  let [isShowPassword, setIsShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      taiKhoan: JSON.parse(localStorage.getItem(USER_LOGIN))?.taiKhoan,
      matKhau: JSON.parse(localStorage.getItem(USER_LOGIN))?.matKhau,
    },
    validationSchema: schema,
    validateOnMount: true,
    onSubmit: (values) => {
      dispatch(loginAction(values));
    },
  });

  console.log("Login");

  return (
    <div className="lg:w-1/2 xl:max-w-screen-sm">
      <div className="py-6 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
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
      <div className="px-12 sm:px-24 md:px-48 lg:px-12 xl:px-24 xl:max-w-2xl">
        <h2
          className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
xl:text-bold"
        >
          Đăng nhập
        </h2>
        <div className="mt-8">
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
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                placeholder="Nhập vào tài khoản"
              />
              <span className="text-red-600 text-sm">
                {formik.touched.taiKhoan && formik.errors.taiKhoan}
              </span>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Mật Khẩu
                </div>
                <div>
                  <NavLink
                    className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                    cursor-pointer"
                    to="/register"
                  >
                    Quên mật khẩu?
                  </NavLink>
                </div>
              </div>
              <div className="relative">
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.matKhau}
                  name="matKhau"
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type={isShowPassword ? "text" : "password"}
                  placeholder="Nhập vào mật khẩu"
                />
                <button
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  type="button"
                  className="text-xl absolute top-2 right-2"
                >
                  {isShowPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </button>
              </div>
              <span className="text-red-600 text-sm">
                {formik.touched.matKhau && formik.errors.matKhau}
              </span>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
            font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
            shadow-lg"
              >
                Đăng nhập
              </button>
            </div>
          </form>
          <div className="mt-4 text-sm font-display font-semibold text-gray-700 text-center">
            Chưa có tài khoản ?{" "}
            <NavLink
              to="/register"
              className="cursor-pointer text-indigo-600 hover:text-indigo-800"
            >
              Đăng ký
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
