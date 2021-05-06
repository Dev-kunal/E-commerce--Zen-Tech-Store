import axios from "axios";

export const UseAxios = async (method, url, body = {}) => {
  let response;
  switch (method) {
    case "GET":
      response = await axios.get(url, body);
      return response.data;
    case "POST":
      response = await axios.post(url, body);
      return response.data;
    case "DELETE":
      response = await axios.delete(url, body);
      return response.data;
    default:
      return response;
  }
};
