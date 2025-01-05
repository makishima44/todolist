import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { FirebaseError } from "firebase/app";
import { setUser } from "../../redux/authSlice";
import { auth } from "../../fireBase/firebaseConfig";

import s from "./Signup.module.css";
import { Input } from "../../common/components/Input/Input";
import { Button } from "../../common/components/Button/Button";

export const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;

      dispatch(setUser({ uid: user.uid, email: user.email }));
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
    <div className={s.main}>
      <div className={s.signup}>
        <form onSubmit={handleSignup}>
          <div className={s.formGroup}>
            <label htmlFor="email">Email</label>
            <Input
              type={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите email"
            />
          </div>

          <div className={s.formGroup}>
            <label htmlFor="email">password</label>
            <Input
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
            />
            <Button type={"submit"} name={"Зарегистрироваться"} />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};
