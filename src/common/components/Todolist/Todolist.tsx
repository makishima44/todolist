import { memo, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { fetchTasksAsync } from "../../../redux/slices/task/taskThunk";
import { TodolistTitleBlock } from "../TodolistTitleBlock/TodolistTitleBlock";
import { FilteredButtonBlock } from "../FilteredButtonBlock/FilteredButtonBlock";
import { TaskMenu } from "../TaskMenu/TaskMenu";
import { TaskList } from "../TaskList/TaskList";

import s from "./Todolist.module.css";
import { TodolistDateCreate } from "../TodolistDateCreate/TodolistDateCreate";

type TodolistProps = { todolistName: string; todolistId: string; dateCreated: string };

export const Todolist = memo(({ todolistName, todolistId, dateCreated }: TodolistProps) => {
  const dispatch = useAppDispatch();

  const uid = useAppSelector((state) => state.auth.uid);

  useEffect(() => {
    if (uid) {
      dispatch(fetchTasksAsync({ todolistId, uid }));
    }
  }, [dispatch, todolistId, uid]);

  if (!uid) {
    return <div>Please log in to view your todolists</div>;
  }

  return (
    <div className={s.todolist}>
      <TodolistTitleBlock uid={uid} todolistId={todolistId} todolistName={todolistName} />
      <TaskMenu todolistId={todolistId} uid={uid} />
      <TaskList todolistId={todolistId} />
      <FilteredButtonBlock todolistId={todolistId} />
      <TodolistDateCreate dateCreated={dateCreated} />
    </div>
  );
});
