import axios from "axios";

export const UseAxios = async (method, url, body = {}) => {
  let response;
  switch (method) {
    case "GET":
      response = await axios.get(url);
      return response.data;
    case "POST":
      response = await axios.post(url);
      return response.data;
    default:
      return response;
  }
};
