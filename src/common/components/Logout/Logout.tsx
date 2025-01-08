import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../fireBase/firebaseConfig";

import { clearUser } from "../../../redux/slices/auth/authSlice";
import { useAppDispatch } from "../../../redux/store";
import { Button } from "../Button/Button";
import { memo } from "react";

export const Logout = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    try {
      await signOut(auth);
      localStorage.removeItem("authToken");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userUid");
      dispatch(clearUser());
      alert("Вы вышли из системы");
      navigate("/login");
    } catch (error: any) {
      alert("Ошибка при выходе: " + error.message);
    }
  };

  return <Button name={"Exit"} onClick={handleLogout}></Button>;
});
