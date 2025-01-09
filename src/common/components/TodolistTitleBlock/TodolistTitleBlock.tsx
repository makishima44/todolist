import { EditableTitle } from "../EditableTitle/EditableTitle";
import { useAppDispatch } from "../../../redux/store";
import { Button } from "../Button/Button";
import {
  fetchTodolistsAsync,
  removeTodolistAsync,
  updateTodolistTitleAsync,
} from "../../../redux/slices/todolist/todolistThunk";
import { memo, useCallback } from "react";

import s from "./TodolistTitleBlock.module.css";

type TodolistTitleBlock = { uid: string; todolistName: string; todolistId: string };

export const TodolistTitleBlock = memo(({ todolistId, uid, todolistName }: TodolistTitleBlock) => {
  const dispatch = useAppDispatch();

  const handleChangeTodolisTitle = useCallback(
    (newTitle: string) => {
      if (uid) {
        dispatch(updateTodolistTitleAsync({ todolistId, title: newTitle, uid }));
      }
    },
    [dispatch, todolistId, uid]
  );

  const handleDeleteTodolist = useCallback(() => {
    if (uid) {
      dispatch(removeTodolistAsync({ todolistId, uid }));
      dispatch(fetchTodolistsAsync(uid));
    }
  }, [dispatch, todolistId, uid]);

  return (
    <div className={s.todolistTitleBlock}>
      <EditableTitle title={todolistName} onChange={handleChangeTodolisTitle}></EditableTitle>
      <Button useIcon={true} onClick={handleDeleteTodolist} variant="delete" />
    </div>
  );
});
