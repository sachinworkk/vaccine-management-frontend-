import { BrowserRouter, Route, Routes } from "react-router-dom";

import store from "../redux/store";
import { Provider } from "react-redux";

import * as routes from "../routes/routes";

import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import VaccinePage from "../pages/VaccinPage";
import PageNotFound from "../pages/PageNotFound";
import VaccineDetail from "../pages/VaccineDetail";

import Dashboard from "../components/dashboard/Dashboard";

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
            <Route path={routes.VACCINE_DETAIL} element={<VaccineDetail />} />
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
