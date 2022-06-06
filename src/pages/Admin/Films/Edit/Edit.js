import React, { Fragment, useState, useEffect } from "react";
import { Form, Input, DatePicker, InputNumber, Switch } from "antd";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { GROUPID } from "../../../../util/settings/config";
import {
  getFilmInfo,
  updateFilmAction,
} from "../../../../redux/actions/filmManagement";
import { useSelector } from "react-redux";
import moment from "moment";

const Edit = (props) => {
  let dispatch = useDispatch();
  let { thongTinPhim } = useSelector((state) => state.movieList);
  let [imgSelecting, setImgSelecting] = useState("");
  const dateFormat = "DD/MM/YYYY";

  let formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: thongTinPhim.maPhim,
      tenPhim: thongTinPhim.tenPhim,
      trailer: thongTinPhim.trailer,
      moTa: thongTinPhim.moTa,
      ngayKhoiChieu: localStorage.getItem("ngayKhoiChieu"),
      dangChieu: thongTinPhim.dangChieu,
      sapChieu: thongTinPhim.sapChieu,
      hot: thongTinPhim.hot,
      danhGia: thongTinPhim.danhGia,
      hinhAnh: null,
      maNhom: GROUPID,
    },

    onSubmit: (values) => {
      console.log("values", values);
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") formData.append(key, values[key]);
        else formData.append("hinhAnh", values.hinhAnh);
      }
      dispatch(updateFilmAction(formData));
    },
  });

  let handleChangeDatePicker = (moment, value) => {
    formik.setFieldValue("ngayKhoiChieu", value);
  };

  let handleChangeFormValue = (value, name) => {
    formik.setFieldValue(name, value);
  };

  let handleChangeFile = async (event) => {
    let file = event.target.files[0];
    if (
      file?.type === "image/jpeg" ||
      file?.type === "image/jpg" ||
      file?.type === "image/png" ||
      file?.type === "image/gif"
    ) {
      await formik.setFieldValue("hinhAnh", file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSelecting(e.target.result);
      };
    } else alert("Vui lòng upload file hình!!!");
  };

  useEffect(() => {
    dispatch(getFilmInfo(props.match.params.id));
  }, [dispatch, props.match.params.id]);

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
        <h3 className="w-4/5 text-center text-2xl">Chỉnh sửa phim</h3>
        <Form.Item label="Tên phim">
          <Input
            onChange={formik.handleChange}
            value={formik.values.tenPhim}
            name="tenPhim"
          />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            onChange={formik.handleChange}
            value={formik.values.trailer}
            name="trailer"
          />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input
            onChange={formik.handleChange}
            value={formik.values.moTa}
            name="moTa"
          />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker
            onChange={handleChangeDatePicker}
            defaultValue={moment(formik.values.ngayKhoiChieu)}
            format={dateFormat}
          />
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch
            onChange={(value) => handleChangeFormValue(value, "dangChieu")}
            checked={formik.values.dangChieu}
          />
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch
            onChange={(value) => handleChangeFormValue(value, "sapChieu")}
            checked={formik.values.sapChieu}
          />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch
            onChange={(value) => handleChangeFormValue(value, "hot")}
            checked={formik.values.hot}
          />
        </Form.Item>
        <Form.Item label="Đánh giá">
          <InputNumber
            min={1}
            max={10}
            onChange={(value) => handleChangeFormValue(value, "danhGia")}
            value={formik.values.danhGia}
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
          <img
            className="w-20 h-24 p-0 m-0"
            src={imgSelecting ? imgSelecting : thongTinPhim.hinhAnh}
            alt="hinhAnh"
          />
        </Form.Item>
        <Form.Item colon={false} label=" ">
          <button
            type="submit"
            className="bg-gray-400 hover:bg-gray-800 duration-300 text-black text-base font-semibold hover:text-white px-3 py-1.5"
          >
            Cập nhật
          </button>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default Edit;
