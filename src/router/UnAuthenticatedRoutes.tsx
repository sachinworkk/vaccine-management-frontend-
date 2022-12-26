import { Navigate, Outlet } from "react-router-dom";

import { getToken } from "../utils/localStorage";

import * as routes from "../routes/routes";

function UnAuthenticatedRoutes() {
  return Boolean(getToken("accessToken")) &&
    Boolean(getToken("refreshToken")) ? (
    <Navigate to={routes.DASHBOARD} />
  ) : (
    <Outlet />
  );
}

export default UnAuthenticatedRoutes;
