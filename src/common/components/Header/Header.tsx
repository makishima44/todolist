import React, { useState } from "react";
import s from "./Header.module.css";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { Clock } from "../Clock/Clock";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { Weather } from "../Weather/Weather";
import { addTodolistAsync } from "../../../redux/todolistThunk";
import { Logout } from "../Logout/Logout";

export const Header = () => {
  const dispatch = useAppDispatch();
  const [todolistName, setTodolistName] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isLoading = useAppSelector((state) => state.todolists.loading);
  const uid = useAppSelector((state) => state.auth.uid);

  const handleCreateTodolist = () => {
    if (todolistName.length < 4) {
      setErrorMessage("Name should be more than 4 symbols.");
    } else if (todolistName.length > 25) {
      setErrorMessage("Name should be less than 25 symbols.");
    } else {
      if (uid) {
        dispatch(addTodolistAsync({ uid, title: todolistName }));
      }

      setTodolistName("");
      setErrorMessage(null); // Очистить сообщение об ошибке после успешной отправки
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodolistName(event.target.value);
  };

  return (
    <div className={s.header}>
      <div className={s.todolistContainer}>
        <Input onChange={handleInputChange} value={todolistName} />
        <Button name={"Create Todolist"} onClick={handleCreateTodolist} disabled={isLoading} />
        <Logout />
      </div>
      {errorMessage && <div className={s.errorMessage}>{errorMessage}</div>} {/* Отображение ошибки */}
      <div className={s.weatherAndClockContainer}>
        <Weather location={"Mogilev, Belarus"} />
        <Clock />
      </div>
    </div>
  );
};
