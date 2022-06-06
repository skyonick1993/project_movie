import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { cinemaAction } from "../../../../redux/actions/cinema";

const Footer = () => {
  let dispatch = useDispatch();
  let { heThongRapChieu } = useSelector((state) => state.cinema);

  let arrHeThongRap = _.map(heThongRapChieu, (item) =>
    _.pick(item, ["maHeThongRap", "tenHeThongRap", "logo"])
  );

  useEffect(() => {
    dispatch(cinemaAction());
  }, [dispatch]);

  return (
    <div>
      <footer className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap md:text-left text-center order-first">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
                MOBILE APP
              </h2>
              <nav className="list-none mb-10 flex gap-3">
                <li>
                  <NavLink
                    className="text-gray-400 hover:text-white"
                    to="https://apps.apple.com/vn/app/tix-%C4%91%E1%BA%B7t-v%C3%A9-nhanh-nh%E1%BA%A5t/id615186197"
                  >
                    <img
                      className="w-6 h-7"
                      src="https://tix.vn/app/assets/img/icons/apple-logo.png"
                      alt="apple-logo"
                    />
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="text-gray-400 hover:text-white"
                    to="https://play.google.com/store/apps/details?id=vn.com.vng.phim123"
                  >
                    <img
                      className="w-6 h-7"
                      src="https://tix.vn/app/assets/img/icons/android-logo.png"
                      alt="android-logo"
                    />
                  </NavLink>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
                ĐIỀU KHOẢN
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <NavLink
                    className="text-gray-400 hover:text-white"
                    to="/contact"
                  >
                    Thỏa thuận sử dụng
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="text-gray-400 hover:text-white"
                    to="/contact"
                  >
                    Chính sách bảo mật
                  </NavLink>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
                ĐỐI TÁC
              </h2>
              <nav className="list-none mb-10 grid grid-cols-3 gap-3 w-3/4">
                {arrHeThongRap?.map((item, index) => {
                  return (
                    <li key={index}>
                      <NavLink
                        className="text-gray-400 hover:text-white"
                        to="/home"
                      >
                        <img
                          className="w-12"
                          src={item.logo}
                          alt={item.tenHeThongRap}
                        />
                      </NavLink>
                    </li>
                  );
                })}
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
                SUBSCRIBE
              </h2>
              <div className="flex xl:flex-nowrap md:flex-nowrap lg:flex-wrap flex-wrap justify-center items-end md:justify-start">
                <div className="relative w-40 sm:w-auto xl:mr-4 lg:mr-0 sm:mr-4 mr-2">
                  <label
                    htmlFor="footer-field"
                    className="leading-7 text-sm text-gray-400"
                  >
                    Placeholder
                  </label>
                  <input
                    type="text"
                    id="footer-field"
                    name="footer-field"
                    className="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <button className="lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Button
                </button>
              </div>
              <p className="text-gray-500 text-sm mt-2 md:text-left text-center">
                Bitters chicharrones fanny pack
                <br className="lg:block hidden" />
                waistcoat green juice
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 bg-opacity-75">
          <div className="container px-5 py-6 mx-auto flex justify-between items-center sm:flex-row flex-col">
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
              <span className="ml-3 text-xl">Let's Movie</span>
            </NavLink>
            <p className="text-sm text-gray-400 sm:ml-6 sm:mt-0 mb-0">
              © 2021 Design by Hiepnguyen —
              <NavLink
                to="https://www.facebook.com/nguyenxuanhiep1993"
                className="text-gray-500 ml-1 hover:text-yellow-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                @skyonick1993
              </NavLink>
            </p>
            <span className="inline-flex sm:mt-0 mt-4 justify-center sm:justify-start">
              <NavLink
                className="text-gray-400 hover:text-yellow-400"
                to="/home"
              >
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </NavLink>
              <NavLink
                className="ml-3 text-gray-400 hover:text-yellow-400"
                to="/home"
              >
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </NavLink>
              <NavLink
                className="ml-3 text-gray-400 hover:text-yellow-400"
                to="/home"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                </svg>
              </NavLink>
              <NavLink
                className="ml-3 text-gray-400 hover:text-yellow-400"
                to="/home"
              >
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="none"
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                  />
                  <circle cx={4} cy={4} r={2} stroke="none" />
                </svg>
              </NavLink>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
