import { combineReducers } from "redux";

const initialWindowSize = {
  width: window.innerWidth,
  height: window.innerHeight,
  device: window.innerWidth > 1024 ?  'laptop' : window.innerWidth <= 1024 && window.innerWidth > 780 ? "tab" : "mobile"
};

const windowSizeReducer = (state = initialWindowSize, action) => {
  switch (action.type) {
    case 'SET_WINDOW_SIZE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  windowSize: windowSizeReducer,
  // Assign windowSizeReducer to windowSize property
  // Add other reducers as needed
});

export default rootReducer;