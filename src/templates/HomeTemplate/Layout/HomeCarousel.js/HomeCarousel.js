import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { carouselAction } from "../../../../redux/actions/carousel";
import "./HomeCarousel.css";

const contentStyle = {
  height: "500px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const HomeCarousel = () => {
  let { bannerList } = useSelector((state) => state.carouselReducer);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(carouselAction);
  }, [dispatch]);

  return (
    <Carousel autoplay className="mt-20">
      {bannerList.map((item, index) => {
        return (
          <div key={index}>
            <div style={contentStyle}>
              <img className="w-full h-full" src={item.hinhAnh} alt="pic1" />
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default HomeCarousel;
