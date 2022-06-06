import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { history } from "../../../../App";
import "./Style.css";
import { Menu, Dropdown, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import _ from "lodash";
import { TOKEN, USER_LOGIN } from "../../../../util/settings/config";
import { GithubOutlined } from "@ant-design/icons";

const Header = () => {
  const { t, i18n } = useTranslation();
  let { userLogin } = useSelector((state) => state.userReducer);
  let [isFlag, setIsFlag] = useState("/assets/eng.svg");

  const handleMenuClick = (e) => {
    i18n.changeLanguage(e.key);
    if (e.key === "en") setIsFlag("/assets/eng.svg");
    if (e.key === "chi") setIsFlag("/assets/chi.svg");
    if (e.key === "vi") setIsFlag("/assets/vie.svg");
  };

  useEffect(() => i18n.changeLanguage("en"), [i18n]);

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item
        key="en"
        icon={<img className="w-5" src="/assets/eng.svg" alt="en" />}
      >
        Eng
      </Menu.Item>
      <Menu.Item
        key="chi"
        icon={<img className="w-5" src="/assets/chi.svg" alt="chi" />}
      >
        Chi
      </Menu.Item>
      <Menu.Item
        key="vi"
        icon={<img className="w-5" src="/assets/vie.svg" alt="vie" />}
      >
        Vie
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <header className="header px-3 py-2">
        <div className="flex justify-between h-16 mx-auto">
          <div className="w-1/3 flex">
            <NavLink
              to="/home"
              className="flex items-center justify-start title-font font-medium  text-white hover:text-yellow-400"
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
              <span className="ml-3 text-xl">Let's Movie</span>
            </NavLink>
          </div>
          <ul className="w-1/3 justify-center items-center hidden space-x-3 lg:flex mb-0">
            <li className="navbar-nav">
              <NavLink
                to="/home"
                activeClassName="activeClassname"
                className="navLink-header flex items-center px-4 hover:text-white"
              >
                {t("home")}
              </NavLink>
            </li>
            <li className="navbar-nav">
              <NavLink
                to="/contact"
                activeClassName="activeClassname"
                className="navLink-header flex items-center px-4 hover:text-white"
              >
                {t("contact")}
              </NavLink>
            </li>
            <li className="navbar-nav">
              <NavLink
                to="/news"
                activeClassName="activeClassname"
                className="navLink-header flex items-center px-4 hover:text-white"
              >
                {t("news")}
              </NavLink>
            </li>
          </ul>
          <div className="w-1/3 justify-end items-center flex-shrink-0 hidden lg:flex">
            <Space wrap>
              <Dropdown.Button
                className="btnLang"
                overlay={menu}
                placement="bottomCenter"
                icon={<img className="w-5 mx-auto" src={isFlag} alt="flag" />}
              ></Dropdown.Button>
            </Space>
            {_.isEmpty(userLogin) ? (
              <button
                onClick={() => history.push("/login")}
                className="btn-header"
              >
                {t("signup")} / {t("signin")}
              </button>
            ) : (
              <div className="text-base font-medium">
                <NavLink to="/profile">
                  <GithubOutlined className="text-4xl" />{" "}
                  <span>{userLogin.taiKhoan}</span>
                </NavLink>{" "}
                <button
                  type="button"
                  className="hover:text-white duration-300"
                  onClick={() => {
                    localStorage.removeItem(USER_LOGIN);
                    localStorage.removeItem(TOKEN);
                    history.push("/home");
                    window.location.reload();
                  }}
                >
                  {t("logout")}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
