import { EditableTitle } from "../EditableTitle/EditableTitle";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { Button } from "../Button/Button";
import { changeTaskStatusAsync, removeTaskAsync, updateTaskTitleAsync } from "../../../redux/slices/task/taskThunk";
import { StatusTask } from "../../../redux/types/types";

import s from "./Task.module.css";
import { memo } from "react";

type TaskProps = {
  taskName: string;
  todolistId: string;
  taskId: string;
  taskStatus: StatusTask;
};

export const Task = memo(({ taskName, todolistId, taskId, taskStatus }: TaskProps) => {
  const dispatch = useAppDispatch();
  const uid = useAppSelector((state) => state.auth.uid);

  if (!uid) {
    return <div>Unauthorized</div>;
  }

  const handleDeleteTask = () => {
    dispatch(removeTaskAsync({ uid, todolistId, taskId }));
  };

  const handleChangeTaskStatus = () => {
    const newStatus = taskStatus === "active" ? "complete" : "active";
    dispatch(changeTaskStatusAsync({ uid, todolistId, taskId, status: newStatus }));
  };

  const handleChangeTaskTitle = (newTitle: string) => {
    dispatch(updateTaskTitleAsync({ uid, todolistId, taskId, title: newTitle }));
  };

  return (
    <div className={s.taskBlock}>
      <div className={s.taskContent}>
        <input type="checkbox" checked={taskStatus === "complete"} onChange={handleChangeTaskStatus} />
        <EditableTitle title={taskName} onChange={handleChangeTaskTitle}></EditableTitle>
      </div>

      <Button useIcon={true} onClick={handleDeleteTask} variant="delete" />
    </div>
  );
});
