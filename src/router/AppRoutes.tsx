import { BrowserRouter, Route, Routes } from "react-router-dom";

import * as routes from "../routes/routes";

import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import VaccinePage from "../pages/VaccinPage";
import PageNotFound from "../pages/PageNotFound";

import Dashboard from "../components/dashboard/Dashboard";

import { Provider } from "react-redux";
import store from "../redux/store";

import AuthenticatedRoutes from "./AuthenticatedRoutes";
import UnAuthenticatedRoutes from "./UnAuthenticatedRoutes";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Provider store={store}>
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
      </Provider>
    </BrowserRouter>
  );
}
export default AppRoutes;
