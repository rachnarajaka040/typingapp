import { GET_SETTINGS } from "./ActionTypes";

const initialState = {
  timer: 5,
  displaytext: "a s d f j k l ;",
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_SETTINGS:
      return {
        ...state,
        timer: payload.timer,
        displaytext: payload.displaytext,
      };

    default:
      return state;
  }
};

export { reducer };
