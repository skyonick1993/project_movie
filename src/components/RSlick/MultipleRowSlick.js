import React, { useState } from "react";
import Slider from "react-slick";
import Film from "../Film/Film";
import styleSlick from "./MultipleRowSlick.module.css";

function SampleNextArrow(props) {
  let { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-next"]}`}
      style={{
        ...style,
        display: "block",
      }}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props) {
  let { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{
        ...style,
        display: "block",
      }}
      onClick={onClick}
    ></div>
  );
}

const MultipleRows = (props) => {
  let [showFilms, setShowFilms] = useState(true);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "10px",
    slidesToShow: 4,
    speed: 400,
    rows: 1,
    slidesPerRow: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div>
      <div className="px-3 flex justify-center">
        <button
          onClick={() => setShowFilms(true)}
          className={
            showFilms ? "active-selectedFilm btn-purple" : "btn-purple"
          }
        >
          Phim Đang Chiếu
        </button>
        <button
          onClick={() => setShowFilms(false)}
          className={
            !showFilms ? "active-selectedFilm btn-purple" : "btn-purple"
          }
        >
          Phim Sắp Chiếu
        </button>
      </div>
      <Slider {...settings}>
        {showFilms
          ? props.danhSachPhim
              .filter((item) => item.dangChieu)
              .map((item) => {
                return (
                  <div
                    className={`${styleSlick["width-item"]}`}
                    key={item.maPhim}
                  >
                    <Film key={item.maPhim} film={item} />
                  </div>
                );
              })
          : props.danhSachPhim
              .filter((item) => item.sapChieu)
              .map((item) => {
                return (
                  <div
                    className={`${styleSlick["width-item"]}`}
                    key={item.maPhim}
                  >
                    <Film key={item.maPhim} film={item} />
                  </div>
                );
              })}
      </Slider>
    </div>
  );
};

export default MultipleRows;
