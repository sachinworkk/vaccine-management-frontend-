import axios from "axios";

import {
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
  saveRefreshToken,
} from "../utils/localStorage";

import { CONTENT_TYPE_JSON } from "./../constants/misc";

/**
 * Axios instance for pipeline http.
 */
export const http = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": CONTENT_TYPE_JSON,
    Accept: CONTENT_TYPE_JSON,
  },
});

/**
 * interceptors setup for that instance before sending any request
 */
http.interceptors.request.use(
  (config) => {
    if (config.headers)
      config.headers["Authorization"] = "Bearer " + getAccessToken();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      //got error response
      if (
        err.response.status === 401 &&
        !originalConfig._retry &&
        err.response.data.details === "Invalid session"
      ) {
        // Access Token was expired
        originalConfig._retry = true;
        try {
          const rs = await http.post("/token/refresh", {
            refreshToken: getRefreshToken(),
          });

          const { accessToken } = rs.data;

          saveAccessToken(accessToken);
          return http(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      } else if (
        err.response.status === 401 &&
        !originalConfig._retry &&
        err.response.data.message === "Invalid session"
      ) {
        originalConfig._retry = true;
        saveAccessToken("");
        saveRefreshToken("");
      }
    }
    return Promise.reject(err);
  }
);
