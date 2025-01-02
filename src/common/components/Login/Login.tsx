import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../fireBase/firebaseConfig";
import { FirebaseError } from "firebase/app";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/authSlice"; // Действие для установки данных пользователя
import { Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch(); // Для обновления данных пользователя в Redux

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Попытка авторизации с помощью email и пароля
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;

      // Сохраняем данные о пользователе в Redux
      dispatch(setUser({ uid: user.uid, email: user.email }));

      alert("Вы успешно вошли в систему!");
      setError(null);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message); // Обработка ошибки от Firebase
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  return (
    <>
      {" "}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Введите email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите пароль"
          required
        />
        <button type="submit">Войти</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <p>
        Нет аккаунта? <Link to="/signup">Зарегистрируйтесь</Link>
      </p>
    </>
  );
};
