import React, { Fragment, useState } from "react";
import { Form, Input, DatePicker, InputNumber, Switch } from "antd";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { GROUPID } from "../../../../util/settings/config";
import { addFilmAction } from "../../../../redux/actions/filmManagement";

const AddNew = () => {
  let dispatch = useDispatch();
  let formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
      maNhom: GROUPID,
    },

    onSubmit: (values) => {
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") formData.append(key, values[key]);
        else formData.append("hinhAnh", values.hinhAnh);
      }
      dispatch(addFilmAction(formData));
    },
  });

  let [imgSelecting, setImgSelecting] = useState("/assets/addfile.png");

  let handleChangeDatePicker = (moment, value) => {
    formik.setFieldValue("ngayKhoiChieu", value);
  };

  let handleChangeFormValue = (value, name) => {
    formik.setFieldValue(name, value);
  };

  let handleChangeFile = (event) => {
    let file = event.target.files[0];
    if (
      file?.type === "image/jpeg" ||
      file?.type === "image/jpg" ||
      file?.type === "image/png" ||
      file?.type === "image/gif"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSelecting(e.target.result);
      };
      formik.setFieldValue("hinhAnh", file);
    } else alert("Vui lòng upload file hình!!!");
  };

  return (
    <Fragment>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
      >
        <h3 className="w-4/5 text-center text-2xl">Thêm mới phim</h3>
        <Form.Item label="Tên phim">
          <Input onChange={formik.handleChange} name="tenPhim" />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input onChange={formik.handleChange} name="trailer" />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input onChange={formik.handleChange} name="moTa" />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker onChange={handleChangeDatePicker} format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch
            onChange={(value) => handleChangeFormValue(value, "dangChieu")}
          />
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch
            onChange={(value) => handleChangeFormValue(value, "sapChieu")}
          />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch onChange={(value) => handleChangeFormValue(value, "hot")} />
        </Form.Item>
        <Form.Item label="Đánh giá">
          <InputNumber
            onChange={(value) => handleChangeFormValue(value, "danhGia")}
            defaultValue={1}
            min={1}
            max={10}
          />
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <input
            onChange={handleChangeFile}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/gif"
            className="w-1/3"
          />
          <br />
          <img className="w-20 h-24 p-0 m-0" src={imgSelecting} alt="hinhAnh" />
        </Form.Item>
        <Form.Item colon={false} label=" ">
          <button
            type="submit"
            className="bg-gray-400 hover:bg-gray-800 duration-300 text-black text-base font-semibold hover:text-white px-3 py-1.5"
          >
            Thêm phim
          </button>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default AddNew;
