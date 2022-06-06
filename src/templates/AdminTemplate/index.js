import { Fragment, useEffect, useState } from "react";
import { Redirect, Route } from "react-router";
import { Layout, Menu, Breadcrumb } from "antd";
import { FileOutlined, TeamOutlined } from "@ant-design/icons";
import "./Style.css";
import { USER_LOGIN } from "../../util/settings/config";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AdminTemplate = (props) => {
  const { Component, ...restProps } = props;
  let { userLogin } = useSelector((state) => state.userReducer);
  let [collapsed, setCollapsed] = useState(false);
  useEffect(() => window.scrollTo(0, 0));
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  if (!localStorage.getItem(USER_LOGIN)) {
    alert("Bạn chưa đăng nhập!!!");
    return <Redirect to="/login" />;
  }

  if (userLogin.maLoaiNguoiDung !== "QuanTri") {
    alert("Bạn không có quyền truy cập vào trang này!!!");
    return <Redirect to="/home" />;
  }

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <Fragment>
            <Layout style={{ minHeight: "100vh" }}>
              <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo">
                  <NavLink
                    to="/home"
                    className="flex title-font font-medium items-center md:justify-start justify-center text-white hover:text-yellow-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    {!collapsed && (
                      <span className="ml-3 text-xl">Let's Movie</span>
                    )}
                  </NavLink>
                </div>
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                  <SubMenu
                    key="sub1"
                    icon={<TeamOutlined />}
                    title="User Management"
                  >
                    <Menu.Item key="1">
                      <NavLink className="text-white" to="/admin/users">
                        Users
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item key="2">
                      <NavLink className="text-white" to="/admin/users/addnew">
                        Add new
                      </NavLink>
                    </Menu.Item>
                  </SubMenu>

                  <SubMenu
                    key="sub2"
                    icon={<FileOutlined />}
                    title="Film Management"
                  >
                    <Menu.Item key="3">
                      <NavLink className="text-white" to="/admin/films">
                        Films
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item key="4">
                      <NavLink className="text-white" to="/admin/films/addnew">
                        Add new
                      </NavLink>
                    </Menu.Item>
                    {/* <Menu.Item key="4" icon={<DesktopOutlined />}>
                      <NavLink
                        className="text-white"
                        to="/admin/films/showtime/"
                      >
                        Showtime
                      </NavLink>
                    </Menu.Item> */}
                  </SubMenu>
                </Menu>
              </Sider>
              <Layout className="site-layout">
                {/* <Header
                  className="site-layout-background"
                  style={{ padding: 0 }}
                >
                  <h1 className="text-center">Header</h1>
                </Header> */}
                <Content style={{ margin: "0 16px" }}>
                  <Breadcrumb style={{ margin: "16px 0" }}>
                    {/* <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
                  </Breadcrumb>
                  <div
                    className="site-layout-background"
                    style={{ padding: 24, minHeight: 360 }}
                  >
                    <Component {...propsRoute} />
                  </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                  Designed by Hiepnguyen ©2021 based on Antd
                </Footer>
              </Layout>
            </Layout>
          </Fragment>
        );
      }}
    />
  );
};

export default AdminTemplate;
