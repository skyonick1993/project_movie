import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAction } from "../../redux/actions";
import { actionTypes } from "../../redux/types/actionType";

const Trailer = (props) => {
  let dispatch = useDispatch();
  let { isDisplay, trailer } = useSelector(
    (state) => state.movieList.isPlayTrailer
  );

  return (
    <Fragment>
      {isDisplay && (
        <div
          onClick={() => {
            dispatch(createAction(actionTypes.SET_TRAILER_PLAY, false));
          }}
          style={{ zIndex: 500 }}
          className="fixed flex pt-3 justify-center items-start w-full h-full bg-gray-100 bg-opacity-50"
        >
          <div style={{ zIndex: 1000 }}>
            <iframe
              width="820"
              height="460"
              src={trailer}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Trailer;
