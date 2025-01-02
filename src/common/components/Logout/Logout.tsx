import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../fireBase/firebaseConfig"; // Ваш Firebase конфиг
import { useDispatch } from "react-redux";
import { clearUser } from "../../../redux/authSlice"; // Действие для очистки данных пользователя
import { AppDispatch } from "../../../redux/store"; // Тип для dispatch, который обычно экспортируется из store

const Logout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Типизируем dispatch

  const handleLogout = async (): Promise<void> => {
    try {
      await signOut(auth); // Выход из системы
      dispatch(clearUser()); // Очищаем состояние пользователя в Redux
      alert("Вы вышли из системы");
    } catch (error: any) {
      alert("Ошибка при выходе: " + error.message);
    }
  };

  return <button onClick={handleLogout}>Выйти</button>;
};

export default Logout;