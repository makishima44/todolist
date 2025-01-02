import { Route, Routes } from "react-router-dom";

import { useNavigate } from "react-router-dom"; // Импортируем useNavigate
import { useAppSelector } from "../../../redux/store";
import { Signup } from "../Signup/Signup";
import { Login } from "../Login/Login";
import App from "../../../App";

const RouterComponent = () => {
  const navigate = useNavigate(); // Используем useNavigate для редиректа
  const uid = useAppSelector((state) => state.auth.uid); // Получаем uid из состояния Redux

  // if (!uid) {
  //   // Если пользователь не авторизован, редиректим на страницу логина
  //   navigate("/login", { replace: true });
  // }

  return (
    <Routes>
      {/* Если пользователь не авторизован, показываем страницы регистрации и логина */}
      {!uid ? (
        <>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
        </>
      ) : (
        // Если авторизован, показываем основное приложение
        <Route path="/" element={<App />} />
      )}
      {/* Редирект на страницу логина, если путь не найден */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default RouterComponent;
