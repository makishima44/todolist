import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../fireBase/firebaseConfig";
import { clearUser } from "../../../redux/authSlice";
import { useAppDispatch } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button/Button";

const Logout = () => {
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
};

export default Logout;
