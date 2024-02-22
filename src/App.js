import logo from "./logo.svg";
import "./App.css";
import Admin_signup from "./pages/Admin_signup";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/Admin_page";
import SupervisorPage from "./pages/SupervisorPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Admin_signup />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/adminPage" element={<AdminPage />} />
          <Route path="/supervisorPage" element={<SupervisorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
