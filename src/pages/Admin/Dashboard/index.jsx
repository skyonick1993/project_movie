import React, { useEffect } from "react";
import { Table } from "antd";
import { Input } from "antd";
import {
  AudioOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteUserAction, getUserList } from "../../../redux/actions/user";

const { Search } = Input;

// function onChange(pagination, filters, sorter, extra) {
//   // console.log("params", pagination, filters, sorter, extra);
// }

const Dashboard = (props) => {
  let dispatch = useDispatch();
  let { danhSachUser } = useSelector((state) => state.userReducer);

  const deleteUser = (taiKhoan) => {
    window.confirm(`Bạn muốn xóa tài khoản: ${taiKhoan} ?`) &&
      dispatch(deleteUserAction(taiKhoan));
  };

  const onSearch = (keyword) => {
    dispatch(getUserList(keyword.trim()));
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "taiKhoan",
      render: (text, item, index) => index + 1,
      width: 60,
    },
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDt",
    },
    {
      title: "Mật khẩu",
      dataIndex: "matKhau",
    },
    {
      title: "Loại User",
      dataIndex: "maLoaiNguoiDung",
      width: 120,
    },

    {
      title: "Thao tác",
      dataIndex: "taiKhoan",
      render: (text, item) => {
        return (
          <div
            key={item.maPhim}
            className="flex justify-start items-center gap-3 text-xl"
          >
            <NavLink
              className="text-black hover:text-indigo-400 duration-300"
              to={`/admin/users/edit/${item.taiKhoan}/${item.maLoaiNguoiDung}`}
            >
              <EditOutlined />
            </NavLink>
            <button
              onClick={() => deleteUser(item.taiKhoan)}
              className="text-red-600 hover:text-indigo-400 duration-300"
              type="button"
            >
              <DeleteOutlined />
            </button>
          </div>
        );
      },
      width: 100,
    },
  ];

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  return (
    <div>
      <div className="mb-3 flex justify-between">
        <Search
          placeholder="Nhập tài khoản user"
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
          to="/admin/users/addnew"
          className="bg-gray-400 hover:bg-gray-800 duration-300 text-black text-lg font-semibold hover:text-white px-3 py-1.5 rounded-l-sm rounded-r-sm flex items-center gap-1"
        >
          <PlusOutlined /> <span>Add User</span>
        </NavLink>
      </div>
      <Table
        rowKey="index"
        columns={columns}
        dataSource={danhSachUser}
        pagination={{ defaultPageSize: 100 }}
        scroll={{ y: 270 }}
      />
    </div>
  );
};

export default Dashboard;
