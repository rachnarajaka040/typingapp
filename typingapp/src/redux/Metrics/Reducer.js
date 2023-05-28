import { GET_METRICS } from "./ActionTypes";

const initialState = {
  speed: 0,
  accuracy: 0,
  mistakes: 0,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_METRICS:
      return {
        ...state,
        speed: payload.speed,
        accuracy: payload.accuracy,
        mistakes: payload.mistakes,
      };

    default:
      return state;
  }
};

export { reducer };
