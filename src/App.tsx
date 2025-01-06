import { Route, Routes, Navigate } from "react-router-dom";
import { useAppSelector } from "./redux/store";

import { Login } from "./pages/Login/Login";
import { Main } from "./pages/Main.tsx/Main";
import { Signup } from "./pages/Signup/Signup";
import { ProtectedRoute } from "./common/components/ProtectedRoute/ProtectedRoute";
import { Widgets } from "./pages/Widgets/Widgets";

const RouterComponent = () => {
  const uid = useAppSelector((state) => state.auth.uid);

  return (
    <Routes>
      {!uid && (
        <>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </>
      )}

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={uid ? "/" : "/login"} />} />
      <Route path="/widgets" element={<Widgets />} />
    </Routes>
  );
};

export default RouterComponent;
