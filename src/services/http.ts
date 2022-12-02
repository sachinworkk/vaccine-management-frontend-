import axios from "axios";

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
