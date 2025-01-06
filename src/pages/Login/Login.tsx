import React, { useEffect, useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../fireBase/firebaseConfig";
import { FirebaseError } from "firebase/app";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { Input } from "../../common/components/Input/Input";
import { Button } from "../../common/components/Button/Button";

import s from "./Login.module.css";
import { setUser } from "../../redux/slices/auth/authSlice";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUid = localStorage.getItem("userUid");
    const storedEmail = localStorage.getItem("userEmail");

    if (storedToken && storedUid && storedEmail) {
      dispatch(setUser({ uid: storedUid, email: storedEmail }));
      navigate("/");
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
    <div className={s.main}>
      <div className={s.loginBlock}>
        <form onSubmit={handleLogin}>
          <div className={s.formGroup}>
            <label htmlFor="email">Login</label>
            <Input
              type={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={"Введите логин"}
            />
          </div>

          <div className={s.formGroup}>
            <label htmlFor="email">Password</label>
            <Input
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={"Введите пароль"}
            />
            <Button name={"Enter"} type={"submit"} />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
        <p>
          Нет аккаунта?{" "}
          <Link to="/signup" className={s.link}>
            Зарегистрируйтесь
          </Link>
        </p>
      </div>
    </div>
  );
};
