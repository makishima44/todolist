import React, { useState } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { Clock } from "../Clock/Clock";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { addTodolistAsync } from "../../../redux/todolistsSlice";
import { Weather } from "../Weather/Weather";
import s from "./Header.module.css";

export const Header = () => {
  const dispatch = useAppDispatch();
  const [todolistName, setTodolistName] = useState("");
  const isLoading = useAppSelector((state) => state.todolists.loading);

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
      <div className={s.todolistContainer}>
        <Input onChange={handleInputChange} value={todolistName} />
        <Button
          name={"create Todolist"}
          onClick={handleCreateTodolist}
          disabled={isLoading}
        />
      </div>

      <div className={s.weatherAndClockContainer}>
        <Weather location={"Mogilev, Belarus"} />
        <Clock />
      </div>
    </div>
  );
};
