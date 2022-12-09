import { Navigate, Outlet } from "react-router-dom";
import { getAccessToken, getRefreshToken } from "../utils/localStorage";

import * as routes from "../routes/routes";

function UnAuthenticatedRoutes() {
  return Boolean(getAccessToken()) && Boolean(getRefreshToken()) ? (
    <Navigate to={routes.DASHBOARD} />
  ) : (
    <Outlet />
  );
}

export default UnAuthenticatedRoutes;
