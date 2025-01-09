import { memo } from "react";
import { Task } from "../Task/Task";
import { useAppSelector } from "../../../redux/store";
import s from "./TaskList.module.css";

export type TaskListType = {
  todolistId: string;
};

export const TaskList = memo(({ todolistId }: TaskListType) => {
  const status = useAppSelector((state) => state.tasks.filteredStatus[todolistId] || "all");
  const tasks = useAppSelector((state) => state.tasks.tasks[todolistId] || []);
  const filteredTasks = tasks.filter((task) => status === "all" || task.status === status);

  return (
    <div className={s.taskList}>
      {filteredTasks.map((task) => (
        <Task key={task.id} taskName={task.title} todolistId={todolistId} taskId={task.id} taskStatus={task.status} />
      ))}
    </div>
  );
});
