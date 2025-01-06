import React, { useState } from "react";

import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { Clock } from "../Clock/Clock";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { Weather } from "../Weather/Weather";
import { addTodolistAsync } from "../../../redux/slices/todolist/todolistThunk";
import { Logout } from "../Logout/Logout";

import s from "./Header.module.css";

export const Header = () => {
  const [todolistName, setTodolistName] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dispatch = useAppDispatch();
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
      setErrorMessage(null);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodolistName(event.target.value);
  };

  return (
    <div className={s.header}>
      <div className={s.todolistContainer}>
        <Input type={"text"} onChange={handleInputChange} value={todolistName} />
        <Button name={"Create Todolist"} onClick={handleCreateTodolist} disabled={isLoading} />
        <Logout />
      </div>

      {errorMessage && <div className={s.errorMessage}>{errorMessage}</div>}
      <div className={s.weatherAndClockContainer}>
        <Weather location={"Mogilev, Belarus"} />
        <Clock />
      </div>
    </div>
  );
};
