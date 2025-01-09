import { EditableTitle } from "../EditableTitle/EditableTitle";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { Button } from "../Button/Button";
import { changeTaskStatusAsync, removeTaskAsync, updateTaskTitleAsync } from "../../../redux/slices/task/taskThunk";
import { StatusTask } from "../../../redux/types/types";

import s from "./Task.module.css";
import { memo, useCallback } from "react";

type TaskProps = {
  taskName: string;
  todolistId: string;
  taskId: string;
  taskStatus: StatusTask;
};

export const Task = memo(({ taskName, todolistId, taskId, taskStatus }: TaskProps) => {
  const dispatch = useAppDispatch();
  const uid = useAppSelector((state) => state.auth.uid);

  const handleDeleteTask = useCallback(() => {
    if (uid) dispatch(removeTaskAsync({ uid, todolistId, taskId }));
  }, [dispatch, uid, todolistId, taskId]);

  const handleChangeTaskStatus = useCallback(() => {
    const newStatus = taskStatus === "active" ? "complete" : "active";
    if (uid) dispatch(changeTaskStatusAsync({ uid, todolistId, taskId, status: newStatus }));
  }, [taskStatus, dispatch, uid, todolistId, taskId]);

  const handleChangeTaskTitle = useCallback(
    (newTitle: string) => {
      if (uid) dispatch(updateTaskTitleAsync({ uid, todolistId, taskId, title: newTitle }));
    },
    [dispatch, uid, todolistId, taskId]
  );

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
