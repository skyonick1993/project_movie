import React, { useEffect } from "react";
import { Form, Input, Select, Button } from "antd";
import {
  getUsernameInfoAction,
  updateUserAction,
} from "../../../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { GROUPID } from "../../../../util/settings/config";
import { history } from "../../../../App";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const EditUser = (props) => {
  let dispatch = useDispatch();
  let { thongTinUsernames } = useSelector((state) => state.userReducer);

  let formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: thongTinUsernames.taiKhoan,
      matKhau: thongTinUsernames.matKhau,
      hoTen: thongTinUsernames.hoTen,
      email: thongTinUsernames.email,
      soDt: thongTinUsernames.soDT,
      maLoaiNguoiDung: thongTinUsernames.maLoaiNguoiDung,
      maNhom: GROUPID,
    },
    onSubmit: async (values) => {
      dispatch(updateUserAction(values));
      history.goBack();
    },
  });

  useEffect(() => {
    dispatch(getUsernameInfoAction(props.match.params.taikhoan));
  }, [dispatch, props.match.params.taikhoan]);

  return (
    <div className="w-1/2 mx-auto">
      <h3 className="text-center text-2xl">Edit User</h3>
      <Form
        onSubmitCapture={formik.handleSubmit}
        {...layout}
        name="register"
        validateMessages={validateMessages}
      >
        <Form.Item name="taiKhoan" label="Tài khoản">
          <span className="text-base font-semibold">
            {thongTinUsernames.taiKhoan || props.match.params.taikhoan}
          </span>
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input
            onChange={formik.handleChange}
            value={formik.values.matKhau}
            name="matKhau"
            placeholder="Nhập mật khẩu người dùng"
          />
        </Form.Item>

        <Form.Item
          label="Họ tên"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            onChange={formik.handleChange}
            value={formik.values.hoTen}
            name="hoTen"
            placeholder="Nhập họ tên người dùng"
          />
        </Form.Item>

        <Form.Item
          label="Email"
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
            placeholder="Nhập email người dùng"
          />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input
            onChange={formik.handleChange}
            value={formik.values.soDt}
            name="soDt"
            placeholder="Nhập số điện thoại người dùng"
          />
        </Form.Item>

        <Form.Item
          label="Mã loại người dùng"
          rules={[
            {
              required: true,
              message: "Please select usertype!",
            },
          ]}
        >
          <Select
            onChange={(value) => formik.setFieldValue("maLoaiNguoiDung", value)}
            defaultValue={
              props.match.params.usertype === "KhachHang"
                ? "Khách hàng"
                : "Quản trị"
            }
            placeholder="Chọn loại người dùng"
          >
            <Option value="KhachHang">Khách hàng</Option>
            <Option value="QuanTri">Quản trị</Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditUser;
