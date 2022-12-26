import axios from "axios";

import { getToken, saveToken } from "../utils/localStorage";

import {
  CONTENT_TYPE_JSON,
  CONTENT_TYPE_MULTIFORM_DATA,
} from "./../constants/misc";

/**
 * Get config for axios.
 *
 * @param contentType
 * @returns Object
 */
const getConfig = (contentType: string) => {
  return {
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-Type": contentType,
      Accept: CONTENT_TYPE_JSON,
    },
  };
};

/**
 * Axios instance for vaccine management.
 */
export const http = axios.create(getConfig(CONTENT_TYPE_JSON));

/**
 * Axios instance for vaccine management multiform data.
 */
export const multipartFormHttp = axios.create(
  getConfig(CONTENT_TYPE_MULTIFORM_DATA)
);

/**
 * interceptors setup for that instance before sending any request
 */
multipartFormHttp.interceptors.request.use(
  (config) => {
    if (config.headers)
      config.headers["Authorization"] = "Bearer " + getToken("accessToken");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

multipartFormHttp.interceptors.response.use(
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
            refreshToken: getToken("refreshToken"),
          });

          const { accessToken } = rs.data;

          saveToken(accessToken, "accessToken");
          return multipartFormHttp(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      } else if (
        err.response.status === 401 &&
        !originalConfig._retry &&
        err.response.data.message === "Invalid session"
      ) {
        originalConfig._retry = true;
        saveToken("", "accessToken");
        saveToken("", "refreshToken");
      }
    }
    return Promise.reject(err);
  }
);

/**
 * Interceptors setup for that instance before sending any request
 */
http.interceptors.request.use(
  (config) => {
    if (config.headers)
      config.headers["Authorization"] = "Bearer " + getToken("accessToken");
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
            refreshToken: getToken("refreshToken"),
          });

          const { accessToken } = rs.data;

          saveToken(accessToken, "accessToken");
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

        saveToken("", "accessToken");
        saveToken("", "refreshToken");

        window.location.reload();
        return http(originalConfig);
      }
    }
    return Promise.reject(err);
  }
);
