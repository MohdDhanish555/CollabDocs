import axios from "axios";
import { toastMessage } from "./toast";
import { store } from "../Redux/store";
import { resetState } from "../Redux/actions/resetAction";

const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("collabdocs-access-token");
    if (config.headers)
      config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

function refresh_token() {
  console.log("Refreshing access token");
  const token = localStorage.getItem("collabdocs-refresh-token");
  return axios.get(`${process.env.REACT_APP_BASE_URL}/auth/refresh`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

let refreshing_token: any = null;

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const config = error.config;
    //498
    if (error.response && error?.response?.status === 401 && !config._retry) {
      config._retry = true;
      try {
        refreshing_token = refreshing_token
          ? refreshing_token
          : refresh_token();
        let res = await refreshing_token;
        refreshing_token = null;
        if (res.data.data) {
          localStorage.setItem(
            "collabdocs-access-token",
            res.data?.data?.accessToken
          );
          localStorage.setItem(
            "collabdocs-refresh-token",
            res.data?.data?.refreshToken
          );
        }
        return http(config);
      } catch (err) {
        localStorage.clear();
        toastMessage("error", "Session Expired");
        store.dispatch(resetState());
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default http;
