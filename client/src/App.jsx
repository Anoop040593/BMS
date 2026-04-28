import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/admin";
import Profile from "./pages/Profile";
import PNF from "./pages/PageNotFound";

//styles
import "./App.css";
import "antd/dist/reset.css";

import ProtectRoute from "./components/ProtectedRoute";
import Partner from "./pages/partner";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* /*This is what User will see */}
        <Route
          path="/"
          element={
            <ProtectRoute>
              <Home />{" "}
            </ProtectRoute>
          }
        />
        {/* /*This is what Admin will see */}
        <Route
          path="/admin"
          element={
            <ProtectRoute>
              <Admin />{" "}
            </ProtectRoute>
          }
        />
        {/* /*This is what Partner will see */}
        <Route
          path="/partner"
          element={
            <ProtectRoute>
              <Partner />{" "}
            </ProtectRoute>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<PNF />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
