import axios from "axios";
export const MOVIES_LIST = "MOVIES_LIST";

export const movies = () => {
  return async (dispatch) => {
    const res = await axios({
      method: "GET",
      url: "https://api.tvmaze.com/search/shows?q=all",
    });
    // console.log("movies", res.data);
    dispatch({type:MOVIES_LIST, payload:res.data})
  };
};
