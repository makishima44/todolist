import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/store";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const uid = useAppSelector((state) => state.auth.uid);

  if (!uid) {
    return <Navigate to="/login" />;
  }

  return children;
};
