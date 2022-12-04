import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import { getAccessToken, getRefreshToken } from "../utils/localStorage";

import * as routes from "../routes/routes";

function AuthenticatedRoutes() {
  return Boolean(getAccessToken()) && Boolean(getRefreshToken()) ? (
    <Outlet />
  ) : (
    <Navigate to={routes.SIGN_IN} />
  );
}

export default AuthenticatedRoutes;
