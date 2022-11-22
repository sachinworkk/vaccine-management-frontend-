import { Route, Routes } from "react-router-dom";

import "./App.css";

import LoginPage from "./pages/Login";
import VaccineDashboard from "./pages/VaccineDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />}></Route>
      <Route path="/vaccines" element={<VaccineDashboard />}></Route>
    </Routes>
  );
}

export default App;
