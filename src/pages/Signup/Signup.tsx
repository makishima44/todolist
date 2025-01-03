import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { FirebaseError } from "firebase/app";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom"; // Для редиректа после успешного входа
import { setUser } from "../../redux/authSlice";
import { auth } from "../../fireBase/firebaseConfig";

export const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Для навигации

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;

      // Сохраняем информацию о пользователе в Redux
      dispatch(setUser({ uid: user.uid, email: user.email }));

      // Редирект на главную страницу после успешной регистрации
      navigate("/");

      alert("Вы успешно зарегистрировались!");
      setError(null);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Введите email" />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Введите пароль"
      />
      <button type="submit">Зарегистрироваться</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};
