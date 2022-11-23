import { Route, Routes } from "react-router-dom";

import "./App.css";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import VaccineDashboardPage from "./pages/VaccineDashboardPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />}></Route>
      <Route path="/signup" element={<SignUpPage />}></Route>
      <Route path="/dashboard" element={<VaccineDashboardPage />}></Route>
    </Routes>
  );
}

export default App;
