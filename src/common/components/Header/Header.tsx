import React, { useState } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import s from "./Header.module.css";
import Clock from "../Clock/Clock";
import { Weather } from "../WeatherApi/Weather";
import { useAppDispatch } from "../../../redux/store";
import { addTodolistAsync } from "../../../redux/todolistsSlice";

export const Header = () => {
  const dispatch = useAppDispatch();
  const [todolistName, setTodolistName] = useState("");

  const handleCreateTodolist = () => {
    if (todolistName.length < 4) {
      alert("name should be more 4 symbols");
    } else if (todolistName.length > 25) {
      alert("name should be less than 25 symbols");
    } else {
      dispatch(addTodolistAsync(todolistName));
      setTodolistName("");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodolistName(event.target.value);
  };

  return (
    <div className={s.header}>
      <div className={s.leftBlock}>
        <Input onChange={handleInputChange} value={todolistName} />
        <Button name={"create Todolist"} onClick={handleCreateTodolist} />
      </div>
      <Weather location={"Mogilev, Belarus"} />
      <div className={s.rightBlock}>
        <Clock />
      </div>
    </div>
  );
};
