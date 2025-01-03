import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../fireBase/firebaseConfig";
import { FirebaseError } from "firebase/app";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const uid = useAppSelector((state) => state.auth.uid);
  const dispatch = useDispatch(); // Для обновления данных пользователя в Redux
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUid = localStorage.getItem("userUid");
    const storedEmail = localStorage.getItem("userEmail");

    if (storedToken && storedUid && storedEmail) {
      dispatch(setUser({ uid: storedUid, email: storedEmail }));
      navigate("/"); // Редирект на главную страницу
    }
  }, [dispatch, navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;

      const token = await user.getIdToken();

      localStorage.setItem("authToken", token);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userUid", user.uid);

      // Сохраняем данные о пользователе в Redux
      dispatch(setUser({ uid: user.uid, email: user.email }));

      alert("Вы успешно вошли в систему!");
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
    <>
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
