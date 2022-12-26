import { Navigate, Outlet } from "react-router-dom";

import { getToken } from "../utils/localStorage";

import * as routes from "../routes/routes";

function AuthenticatedRoutes() {
  return Boolean(getToken("accessToken")) &&
    Boolean(getToken("refreshToken")) ? (
    <Outlet />
  ) : (
    <Navigate to={routes.SIGN_IN} />
  );
}

export default AuthenticatedRoutes;
