import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MultipleRows from "../../components/RSlick/MultipleRowSlick";
import { cinemaAction } from "../../redux/actions/cinema";
import { filmManagementAction } from "../../redux/actions/filmManagement";
import HomeCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel.js/HomeCarousel";
import HomeMenu from "./HomeMenu/HomeMenu";

const Home = (props) => {
  let dispatch = useDispatch();
  let { danhSachPhim } = useSelector((state) => state.movieList);
  let { heThongRapChieu } = useSelector((state) => state.cinema);

  useEffect(() => {
    dispatch(filmManagementAction());
    dispatch(cinemaAction());
  }, [dispatch]);

  return (
    <Fragment>
      <HomeCarousel />
      <div className="px-20 bg-gray-900">
        <section className="text-gray-400 body-font">
          <div className="container px-5 py-24 mx-auto">
            <MultipleRows danhSachPhim={danhSachPhim} />
          </div>
        </section>

        <HomeMenu heThongRapChieu={heThongRapChieu} />
      </div>
    </Fragment>
  );
};

export default Home;
