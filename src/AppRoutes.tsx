import { Route, Routes } from "react-router-dom";
import { HomePage } from "./components/HomePage/HomePage";
import { LoginPage } from "./components/LoginPage";
import { App } from "./App";
import { RegistrationPage } from "./components/RegistrationPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
      </Route>

      <Route path="login" element={<LoginPage />}/>
      <Route path="register" element={<RegistrationPage />}/>
    </Routes>
  );
};