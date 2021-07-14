import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:3000",
});
export const setupAuthHeaderForServiceCalls = (token) => {
  instance.defaults.headers.common["Authorization"] = token;
};

export const UseAxios = async (method, url, body = {}) => {
  let response;
  switch (method) {
    case "GET":
      response = await instance.get(url, body);
      return response.data;
    case "POST":
      response = await instance.post(url, body);
      return response.data;
    default:
      return response;
  }
};

export const saveDataToLocalStorage = (token, user) => {
  localStorage.setItem("session", JSON.stringify({ token, user }));
};
