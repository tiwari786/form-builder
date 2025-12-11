import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import FormRenderer from "./components/user/FormRenderer";
import ResponsesList from "./components/admin/ResponsesList";

export default function App() {
  return (
    <BrowserRouter>
      <div className="p-4 bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/forms" element={<UserPage />} />
          <Route path="/render/:id" element={<FormRenderer />} />
          <Route path="/responses/:id" element={<ResponsesList />} />
          <Route path="/" element={<AdminPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
