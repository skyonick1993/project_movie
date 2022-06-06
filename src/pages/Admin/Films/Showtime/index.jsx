import React, { useEffect, useState } from "react";
import { Form, Button, DatePicker, InputNumber, Select } from "antd";
import { quanLyRap } from "../../../../services/QuanLyRapService";
import { useFormik } from "formik";
import moment from "moment";
import { history } from "../../../../App";

const Showtime = (props) => {
  let [state, setState] = useState({
    heThongRap: [],
    cumRap: [],
  });

  let { tenPhim, hinhAnh } =
    JSON.parse(localStorage.getItem("filmParams")) || {};

  let formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: 75000,
    },
    onSubmit: async (value) => {
      try {
        let res = await quanLyRap.taoLichChieu(value);
        alert(res.data.content);
        history.goBack();
      } catch (err) {
        console.log(err.response.data.content);
      }
    },
  });

  const fetchDataHeThongRap = async () => {
    try {
      let res = await quanLyRap.layThongTinHeThongRap();
      setState({
        ...state,
        heThongRap: res.data.content,
      });
    } catch (err) {
      console.log(err.response.data.content);
    }
  };

  useEffect(() => {
    fetchDataHeThongRap();
  }, []);

  const handleChangeHeThongRap = async (value) => {
    try {
      let res = await quanLyRap.layThongTinCumRap(value);
      setState({
        ...state,
        cumRap: res.data.content,
      });
    } catch (err) {
      console.log(err.response.data.content);
    }
  };

  const handleChangeCumRap = (value) => {
    formik.setFieldValue("maRap", value);
  };

  function onOk(value) {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(value).format("DD/MM/YYYY hh:mm:ss")
    );
  }

  const handleChangeValueNumber = (valueNumber) => {
    formik.setFieldValue("giaVe", valueNumber);
  };

  return (
    <div className="container h-screen">
      <h3 className="text-2xl text-center">Tạo lịch chiếu</h3>
      <h3 className="text-2xl text-center">{tenPhim}</h3>
      <div className="flex">
        <div className="w-1/3">
          <img className="ml-auto w-56 h-64" src={hinhAnh} alt={tenPhim} />
        </div>
        <div className="w-1/2">
          <Form
            onSubmitCapture={formik.handleSubmit}
            className="text-center"
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            <Form.Item label="Hệ thống rạp">
              <Select
                options={state.heThongRap?.map((item) => ({
                  label: item.tenHeThongRap,
                  value: item.maHeThongRap,
                }))}
                onChange={handleChangeHeThongRap}
                className="text-left"
                placeholder="Chọn hệ thống rạp"
              />
            </Form.Item>

            <Form.Item label="Cụm rạp">
              <Select
                options={state.cumRap?.map((item) => ({
                  label: item.tenCumRap,
                  value: item.maCumRap,
                }))}
                onChange={handleChangeCumRap}
                className="text-left"
                placeholder="Chọn cụm rạp"
              />
            </Form.Item>

            <Form.Item label="Ngày giờ chiếu">
              <DatePicker
                showTime
                format="DD/MM/YYYY hh:mm:ss"
                onOk={onOk}
                placeholder="Chọn ngày giờ chiếu"
                className="float-left"
              />
            </Form.Item>

            <Form.Item label="Giá vé">
              <InputNumber
                min={75000}
                max={150000}
                defaultValue={75000}
                onChange={handleChangeValueNumber}
                step={1000}
                className="float-left"
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 0,
                span: 0,
              }}
            >
              <Button type="primary" htmlType="submit">
                Tạo lịch chiếu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Showtime;
