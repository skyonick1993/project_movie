import React from "react";
import { Form, Input, Select, Button } from "antd";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { GROUPID } from "../../../../util/settings/config";
import { addUserAction } from "../../../../redux/actions/user";
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
  required: "Vui lòng nhập ${label}!",
  types: {
    email: "${label} không hợp lệ!",
    number: "${label} không hợp lệ!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const AddNewUser = () => {
  let dispatch = useDispatch();

  let formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDt: "",
      maLoaiNguoiDung: "",
      maNhom: GROUPID,
    },
    onSubmit: (values) => {
      dispatch(addUserAction(values));
    },
  });

  return (
    <div className="w-1/2 mx-auto">
      <h3 className="text-center text-2xl">Thêm User</h3>
      <Form
        // onSubmitCapture={formik.handleSubmit}
        name="register"
        initialValues={{
          remember: true,
        }}
        validateMessages={validateMessages}
        onFinish={formik.handleSubmit}
        onFinishFailed={() => alert("Vui lòng điền đầy đủ thông tin!")}
        // autoComplete="off"
        {...layout}
      >
        <Form.Item
          label="Tài khoản"
          name="taiKhoan"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            onChange={formik.handleChange}
            name="taiKhoan"
            placeholder="Nhập tài khoản người dùng"
          />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="matKhau"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            onChange={formik.handleChange}
            name="matKhau"
            placeholder="Nhập mật khẩu người dùng"
          />
        </Form.Item>

        <Form.Item
          label="Họ tên"
          name="hoTen"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            onChange={formik.handleChange}
            name="hoTen"
            placeholder="Nhập họ tên người dùng"
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input
            onChange={formik.handleChange}
            name="email"
            placeholder="Nhập email người dùng"
          />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="soDt"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            onChange={formik.handleChange}
            name="soDt"
            style={{
              width: "100%",
            }}
            placeholder="Nhập số điện thoại người dùng"
          />
        </Form.Item>

        <Form.Item
          label="Mã loại người dùng"
          name="maLoaiNguoiDung"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn loại user!",
            },
          ]}
        >
          <Select
            onChange={(value) => {
              formik.setFieldValue("maLoaiNguoiDung", value);
            }}
            placeholder="Chọn loại người dùng"
          >
            <Option value="KhachHang">Khách hàng</Option>
            <Option value="QuanTri">Quản trị</Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Add user
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddNewUser;
