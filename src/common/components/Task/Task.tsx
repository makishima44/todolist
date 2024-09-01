import React from "react";
import { Button } from "../Button/Button";
import { useDispatch } from "react-redux";
import { removeTask } from "../../../redux/taskSlice";
import s from "./Task.module.css";

type TaskProps = {
  taskName: string;
  todolistId: string;
  taskId: string;
};

export const Task = ({ taskName, todolistId, taskId }: TaskProps) => {
  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    dispatch(removeTask({ todolistId, taskId }));
  };

  return (
    <div className={s.taskBlock}>
      <h3>{taskName}</h3>
      <Button name={"x"} onClick={handleDeleteTask} />
    </div>
  );
};
