import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";

import "./App.css";

import store from "./redux/store";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import VaccinePage from "./pages/VaccinPage";
import Dashboard from "./components/dashboard/Dashboard";

import * as routes from "./routes/routes";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path={routes.SIGN_IN} element={<LoginPage />}></Route>
        <Route path={routes.SIGN_UP} element={<SignUpPage />}></Route>
        <Route path={routes.DASHBOARD} element={<Dashboard />}></Route>
        <Route path={routes.VACCINE} element={<VaccinePage />}></Route>
      </Routes>
    </Provider>
  );
}

export default App;
