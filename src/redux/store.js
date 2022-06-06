import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { movieList } from "./reducers/movieList";
import { carouselReducer } from "./reducers/carousel";
import { cinema } from "./reducers/cinema";
import { userReducer } from "./reducers/user";
import { bookingReducer } from "./reducers/booking";
import { loadingReducer } from "./reducers/loadingReducer";

const rootReducer = combineReducers({
  movieList,
  carouselReducer,
  cinema,
  userReducer,
  bookingReducer,
  loadingReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
