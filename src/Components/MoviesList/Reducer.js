import { MOVIES_LIST } from "./Action";

const initialMoviesList = {
  list: [],
};

export const showsList = (state = initialMoviesList, action) => {
  switch (action.type) {
    case MOVIES_LIST:
      return {
        ...state,
        list:action.payload
      };
      break;

    default:
      return state;
  }
};
