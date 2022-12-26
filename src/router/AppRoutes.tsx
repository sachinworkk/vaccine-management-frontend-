import { BrowserRouter, Route, Routes } from "react-router-dom";

import { setupStore } from "../redux/store";
import { Provider } from "react-redux";

import * as routes from "../routes/routes";

import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import VaccinePage from "../pages/VaccinPage";
import PageNotFound from "../pages/PageNotFound";

import Dashboard from "../pages/Dashboard";

import AuthenticatedRoutes from "./AuthenticatedRoutes";
import UnAuthenticatedRoutes from "./UnAuthenticatedRoutes";

function AppRoutes() {
  return (
    <Provider store={setupStore()}>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthenticatedRoutes />}>
            <Route path={routes.DASHBOARD} element={<Dashboard />} />
            <Route path={routes.VACCINE} element={<VaccinePage />} />
          </Route>

          <Route element={<UnAuthenticatedRoutes />}>
            <Route path={routes.SIGN_IN} element={<LoginPage />} />
            <Route path={routes.SIGN_UP} element={<SignUpPage />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
export default AppRoutes;
