import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const Loading = () => {
  let { isLoading } = useSelector((state) => state.loadingReducer);

  return (
    <Fragment>
      {isLoading && (
        <div
          style={{ zIndex: 1000 }}
          className="fixed flex justify-center items-center w-full h-full bg-gray-100 bg-opacity-50"
        >
          <div>
            <img className="w-28" src="/assets/BeanEater.gif" alt="loading" />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Loading;
