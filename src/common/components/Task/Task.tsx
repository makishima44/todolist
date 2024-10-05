import s from "./Task.module.css";
import { EditableTitle } from "../EditableTitle/EditableTitle";
import { useAppDispatch } from "../../../redux/store";
import { Button } from "../Button/Button";
import { StatusTask } from "../../../redux/taskSlice";
import {
  changeTaskStatusAsync,
  removeTaskAsync,
  updateTaskTitleAsync,
} from "../../../redux/taskThunk";

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
  const dispatch = useAppDispatch();

  const handleDeleteTask = () => {
    dispatch(removeTaskAsync({ todolistId, taskId }));
  };

  const handleChangeTaskStatus = () => {
    const newStatus = taskStatus === "active" ? "complete" : "active";
    dispatch(changeTaskStatusAsync({ todolistId, taskId, status: newStatus }));
  };

  const handleChangeTaskTitle = (newTitle: string) => {
    dispatch(updateTaskTitleAsync({ todolistId, taskId, title: newTitle }));
  };

  return (
    <div className={s.taskBlock}>
      <div className={s.taskContent}>
        <input
          type="checkbox"
          checked={taskStatus === "complete"}
          onChange={handleChangeTaskStatus}
        />
        <EditableTitle
          title={taskName}
          onChange={handleChangeTaskTitle}
        ></EditableTitle>
      </div>

      <Button useIcon={true} onClick={handleDeleteTask} type="delete" />
    </div>
  );
};
