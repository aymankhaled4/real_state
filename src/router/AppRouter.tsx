import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/listings" />} />
      <Route path="/listings" element={<HomePage />} />
    </Routes>
  );
}
