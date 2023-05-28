import { GET_SETTINGS } from "./ActionTypes";

const getSettings = (data) => {
  return {
    type: GET_SETTINGS,
    payload: { ...data },
  };
};

export { getSettings };
