import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";

import "./App.css";

import store from "./redux/store";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import VaccineDashboardPage from "./pages/VaccineDashboardPage";

import * as routes from "./routes/routes";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path={routes.SIGN_IN} element={<LoginPage />}></Route>
        <Route path={routes.SIGN_UP} element={<SignUpPage />}></Route>
        <Route
          path={routes.DASHBOARD}
          element={<VaccineDashboardPage />}
        ></Route>
      </Routes>
    </Provider>
  );
}

export default App;
