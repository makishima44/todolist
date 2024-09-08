import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodolist } from "../../../redux/todolistsSlice";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import s from "./Header.module.css";
import Clock from "../Clock/Clock";
import { Weather } from "../WeatherApi/Weather";

export const Header = () => {
  const dispatch = useDispatch();
  const [todolistName, setTodolistName] = useState("");

  const handleCreateTodolist = () => {
    if (todolistName.length < 4) {
      alert("name should be more 4 symbols");
    } else if (todolistName.length > 25) {
      alert("name should be less than 25 symbols");
    } else {
      dispatch(addTodolist({ title: todolistName }));
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

      <div className={s.rightBlock}>
        <Weather location={"Могилев"} />
        <Clock />
      </div>
    </div>
  );
};
