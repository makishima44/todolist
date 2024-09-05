import React from "react";
import { Button } from "../Button/Button";
import { useDispatch } from "react-redux";
import {
  changeTaskStatus,
  removeTask,
  StatusTask,
} from "../../../redux/taskSlice";
import s from "./Task.module.css";

type TaskProps = {
  taskName: string;
  todolistId: string;
  taskId: string;
  taskStatus: StatusTask;
};

export const Task = ({
  taskName,
  todolistId,
  taskId,
  taskStatus,
}: TaskProps) => {
  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    dispatch(removeTask({ todolistId, taskId }));
  };

  const handleChangeTaskStatus = () => {
    const newStatus = taskStatus === "active" ? "complete" : "active";
    dispatch(changeTaskStatus({ todolistId, taskId, status: newStatus }));
  };

  return (
    <div className={s.taskBlock}>
      <input
        type="checkbox"
        checked={taskStatus === "complete"}
        onChange={handleChangeTaskStatus}
      />
      <span>{taskName}</span>
      <Button name={"x"} onClick={handleDeleteTask} type="delete" />
    </div>
  );
};
