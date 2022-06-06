import React, { Fragment, useEffect } from "react";
import { Table } from "antd";
import { Input } from "antd";
import {
  AudioOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  deleteFilmAction,
  filmManagementAction,
} from "../../../redux/actions/filmManagement";
import { NavLink } from "react-router-dom";

const { Search } = Input;

function onChange(pagination, filters, sorter, extra) {
  // console.log("params", pagination, filters, sorter, extra);
}

const Films = (props) => {
  let dispatch = useDispatch();
  let { danhSachPhim } = useSelector((state) => state.movieList);

  const deleteFilm = (maPhim, tenPhim) => {
    window.confirm(`Bạn muốn xóa phim ${tenPhim} ?`) &&
      dispatch(deleteFilmAction(maPhim));
  };

  const onSearch = (keyword) => {
    dispatch(filmManagementAction(keyword.trim()));
  };

  const columns = [
    {
      title: "Mã Phim",
      dataIndex: "maPhim",
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend"],
      width: "12%",
    },
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) return 1;
        return -1;
      },
      sortDirections: ["ascend", "descend"],
      width: "20%",
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      render: (text, item) => {
        return (
          <img
            key={item.maPhim}
            className="w-10 h-12 mx-auto"
            src={item.hinhAnh}
            alt={item.tenPhim}
          />
        );
      },
      width: "10%",
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      render: (text, item) =>
        text.length > 240 ? (
          <Fragment key={item.maPhim}>{text.substr(0, 240) + "..."}</Fragment>
        ) : (
          <Fragment key={item.maPhim}>{text}</Fragment>
        ),
      width: "45%",
    },
    {
      title: "Chỉnh sửa",
      dataIndex: "maPhim",
      render: (text, item) => {
        return (
          <div
            key={item.maPhim}
            className="flex justify-start items-center gap-3 text-xl"
          >
            <NavLink
              onClick={() => {
                localStorage.setItem("ngayKhoiChieu", item.ngayKhoiChieu);
              }}
              className="text-black hover:text-indigo-400 duration-300"
              to={`/admin/films/edit/${item.maPhim}`}
            >
              <EditOutlined />
            </NavLink>
            <button
              onClick={() => deleteFilm(item.maPhim, item.tenPhim)}
              className="text-red-600 hover:text-indigo-400 duration-300"
              type="button"
            >
              <DeleteOutlined />
            </button>
            <NavLink
              onClick={() => {
                localStorage.setItem("filmParams", JSON.stringify(item));
              }}
              className="text-blue-500 hover:text-indigo-400 duration-300"
              to={`/admin/films/showtime/${item.maPhim}`}
            >
              <CalendarOutlined />
            </NavLink>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(filmManagementAction());
  }, [dispatch]);

  return (
    <div>
      <div className="mb-3 flex justify-between">
        <Search
          placeholder="Nhập tên phim"
          allowClear
          suffix={
            <AudioOutlined
              style={{
                fontSize: 16,
                color: "#1890ff",
              }}
            />
          }
          enterButton={<SearchOutlined className="pb-1 text-lg" />}
          onSearch={onSearch}
          style={{ width: 280 }}
        />
        <NavLink
          to="/admin/films/addnew"
          className="bg-gray-400 hover:bg-gray-800 duration-300 text-black text-lg font-semibold hover:text-white px-3 py-1.5 rounded-l-sm rounded-r-sm flex items-center gap-1"
        >
          <PlusOutlined /> <span>Thêm Phim</span>
        </NavLink>
      </div>
      <Table
        rowKey={"maPhim"}
        columns={columns}
        dataSource={danhSachPhim}
        scroll={{ y: 350 }}
        onChange={onChange}
      />
    </div>
  );
};

export default Films;
