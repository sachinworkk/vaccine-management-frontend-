import axios from "axios";

import { getToken, saveToken } from "../utils/localStorage";

import {
  CONTENT_TYPE_JSON,
  CONTENT_TYPE_MULTIFORM_DATA,
} from "./../constants/misc";

/**
 * Get config for axios.
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
 * Config header.
 */
const configHeader = (config: any) => {
  if (config.headers)
    config.headers["Authorization"] = "Bearer " + getToken("accessToken");
  return config;
};

/**
 * Error handler.
 */
const errorHandler = (error: any) => {
  return Promise.reject(error);
};

/**
 * Handle retry.
 */
const handleRetry = async (err: any) => {
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
};

/**
 * Response handler.
 */
const resHandler = (res: any) => {
  return res;
};

/**
 * Interceptors setup for that instance before sending any request for multiform data.
 */
multipartFormHttp.interceptors.request.use(configHeader, errorHandler);
multipartFormHttp.interceptors.response.use(resHandler, handleRetry);

/**
 * Interceptors setup for that instance before sending any request for http data.
 */
http.interceptors.request.use(configHeader, errorHandler);
http.interceptors.response.use(resHandler, handleRetry);
