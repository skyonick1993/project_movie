import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { carouselAction } from "../../redux/actions/carousel";

const News = (props) => {
  let { bannerList } = useSelector((state) => state.carouselReducer);
  let [likeTheFirstPost, setLikeTheFirstPost] = useState(10);
  let [likeTheSecondPost, setLikeTheSecondPost] = useState(5);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(carouselAction);
  }, [dispatch]);

  return (
    <div className="w-full h-screen text-black text-center bg-gray-300">
      <div className="flex gap-10 mt-20 pt-10 px-10 container">
        <div className="rounded-md shadow-md w-1/2 bg-gray-50 text-gray-800">
          <img
            src={bannerList[0]?.hinhAnh}
            alt="poster1"
            className="object-cover object-center w-full h-72 bg-gray-500"
          />
          <div className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setLikeTheFirstPost(++likeTheFirstPost)}
                  type="button"
                  title="Like post"
                  className="flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 fill-current"
                  >
                    <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z" />
                  </svg>
                </button>
                {likeTheFirstPost}
                <button
                  type="button"
                  title="Add a comment"
                  className="flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 fill-current"
                  >
                    <path d="M496,496H480a273.39,273.39,0,0,1-179.025-66.782l-16.827-14.584C274.814,415.542,265.376,416,256,416c-63.527,0-123.385-20.431-168.548-57.529C41.375,320.623,16,270.025,16,216S41.375,111.377,87.452,73.529C132.615,36.431,192.473,16,256,16S379.385,36.431,424.548,73.529C470.625,111.377,496,161.975,496,216a171.161,171.161,0,0,1-21.077,82.151,201.505,201.505,0,0,1-47.065,57.537,285.22,285.22,0,0,0,63.455,97L496,457.373ZM294.456,381.222l27.477,23.814a241.379,241.379,0,0,0,135,57.86,317.5,317.5,0,0,1-62.617-105.583v0l-4.395-12.463,9.209-7.068C440.963,305.678,464,262.429,464,216c0-92.636-93.309-168-208-168S48,123.364,48,216s93.309,168,208,168a259.114,259.114,0,0,0,31.4-1.913Z" />
                  </svg>
                </button>
                {5}
                <button
                  type="button"
                  title="Share post"
                  className="flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 fill-current"
                  >
                    <path d="M474.444,19.857a20.336,20.336,0,0,0-21.592-2.781L33.737,213.8v38.066l176.037,70.414L322.69,496h38.074l120.3-455.4A20.342,20.342,0,0,0,474.444,19.857ZM337.257,459.693,240.2,310.37,389.553,146.788l-23.631-21.576L215.4,290.069,70.257,232.012,443.7,56.72Z" />
                  </svg>
                </button>
                {5}
              </div>
              <button
                type="button"
                title="Bookmark post"
                className="flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M424,496H388.75L256.008,381.19,123.467,496H88V16H424ZM120,48V456.667l135.992-117.8L392,456.5V48Z" />
                </svg>
              </button>
            </div>
            <div className="text-left pt-3 pb-2">
              <p className="text-xl font-semibold mb-1 uppercase">
                V???A ?????P L???I V???A T??I N??NG, D??N SAO NAM C???A PHIM ???B??N TAY DI???T
                QU?????? ?????M B???O ?????N TIM H???I CH??? EM
              </p>
              <span className="text-base font-medium">
                Quy t??? 3 nam t??i t??? v???a ??i???n trai, v???a ???????c ????nh gi?? cao v??? n??ng
                l???c di???n xu???t l?? Park Seo Joon, Woo Do Hwan v?? Choi Woo Sik
              </span>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Add a comment..."
                className="w-full py-0.5 bg-transparent border-none rounded text-sm pl-0 text-gray-800"
              />
            </div>
          </div>
        </div>
        <div className="rounded-md shadow-md w-1/2 bg-gray-50 text-gray-800">
          <img
            src={bannerList[1]?.hinhAnh}
            alt="poster2"
            className="object-cover object-center w-full h-72 bg-gray-500"
          />
          <div className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setLikeTheSecondPost(++likeTheSecondPost)}
                  type="button"
                  title="Like post"
                  className="flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 fill-current"
                  >
                    <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z" />
                  </svg>
                </button>
                {likeTheSecondPost}
                <button
                  type="button"
                  title="Add a comment"
                  className="flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 fill-current"
                  >
                    <path d="M496,496H480a273.39,273.39,0,0,1-179.025-66.782l-16.827-14.584C274.814,415.542,265.376,416,256,416c-63.527,0-123.385-20.431-168.548-57.529C41.375,320.623,16,270.025,16,216S41.375,111.377,87.452,73.529C132.615,36.431,192.473,16,256,16S379.385,36.431,424.548,73.529C470.625,111.377,496,161.975,496,216a171.161,171.161,0,0,1-21.077,82.151,201.505,201.505,0,0,1-47.065,57.537,285.22,285.22,0,0,0,63.455,97L496,457.373ZM294.456,381.222l27.477,23.814a241.379,241.379,0,0,0,135,57.86,317.5,317.5,0,0,1-62.617-105.583v0l-4.395-12.463,9.209-7.068C440.963,305.678,464,262.429,464,216c0-92.636-93.309-168-208-168S48,123.364,48,216s93.309,168,208,168a259.114,259.114,0,0,0,31.4-1.913Z" />
                  </svg>
                </button>
                {9}
                <button
                  type="button"
                  title="Share post"
                  className="flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 fill-current"
                  >
                    <path d="M474.444,19.857a20.336,20.336,0,0,0-21.592-2.781L33.737,213.8v38.066l176.037,70.414L322.69,496h38.074l120.3-455.4A20.342,20.342,0,0,0,474.444,19.857ZM337.257,459.693,240.2,310.37,389.553,146.788l-23.631-21.576L215.4,290.069,70.257,232.012,443.7,56.72Z" />
                  </svg>
                </button>
                {0}
              </div>
              <button
                type="button"
                title="Bookmark post"
                className="flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M424,496H388.75L256.008,381.19,123.467,496H88V16H424ZM120,48V456.667l135.992-117.8L392,456.5V48Z" />
                </svg>
              </button>
            </div>
            <div className="text-left pt-3 pb-2">
              <p className="text-xl font-semibold mb-1 uppercase">
                ???n ?????nh ch???c n???ch ng??y kh???i chi???u 16.04, L?? H???i tung clip L???t
                M???t: 48H ?????m ch???t
              </p>
              <span className="text-base font-medium">
                Tr?????c th???m kh???i chi???u 16.04 n??y, L?? H???i b???t ng??? tung clip r?????t
                ??u???i gay c???n th??t tim fans h??m m???
              </span>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Add a comment..."
                className="w-full py-0.5 bg-transparent border-none rounded text-sm pl-0 text-gray-800"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
