import s from "./Todolist.module.css";
import { memo, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { Task } from "../Task/Task";
import { fetchTasksAsync } from "../../../redux/slices/task/taskThunk";
import { FilteredButtonBlock } from "../FilteredButtonBlock/FilteredButtonBlock";
import { TodolistTitleBlock } from "../TodolistTitleBlock/TodolistTitleBlock";
import { TaskMenu } from "../TaskMenu/TaskMenu";

type TodolistProps = { todolistName: string; todolistId: string; dateCreated: string };

export const Todolist = memo(({ todolistName, todolistId, dateCreated }: TodolistProps) => {
  const dispatch = useAppDispatch();

  const uid = useAppSelector((state) => state.auth.uid);
  const tasks = useAppSelector((state) => state.tasks.tasks[todolistId] || []);
  const status = useAppSelector((state) => state.tasks.filteredStatus[todolistId] || "all");

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (status === "all") return true;
      return task.status === status;
    });
  }, [tasks, status]);

  useEffect(() => {
    if (uid && tasks.length === 0) {
      dispatch(fetchTasksAsync({ todolistId, uid }));
    }
  }, [dispatch, todolistId, uid]);

  const formattedDate = new Date(dateCreated).toLocaleString();

  if (!uid) {
    return <div>Please log in to view your todolists</div>; // Если нет uid, просим пользователя войти
  }

  return (
    <div className={s.todolist}>
      <div className={s.todolistTitleBlock}>
        <TodolistTitleBlock uid={uid} todolistId={todolistId} todolistName={todolistName} />
      </div>

      <div className={s.taskBlock}>
        <div className={s.taskMenu}>
          <TaskMenu todolistId={todolistId} uid={uid} />
        </div>

        <div className={s.taskList}>
          {filteredTasks.map((task) => (
            <Task
              key={task.id}
              taskName={task.title}
              todolistId={todolistId}
              taskId={task.id}
              taskStatus={task.status}
            />
          ))}
        </div>
      </div>

      <div className={s.filterBlock}>
        <FilteredButtonBlock todolistId={todolistId} />
      </div>

      <div className={s.todolistDateCreateBlock}>
        <span className={s.todolistDateCreate}>Created: {formattedDate}</span>
      </div>
    </div>
  );
});
