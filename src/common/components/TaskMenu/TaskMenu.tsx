import React, { memo, useCallback, useState } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { useAppDispatch } from "../../../redux/store";
import { addTaskAsync } from "../../../redux/slices/task/taskThunk";

import s from "./TaskMenu.module.css";

type TaskMenuProps = { uid: string | null; todolistId: string };

export const TaskMenu = memo(({ uid, todolistId }: TaskMenuProps) => {
  const dispatch = useAppDispatch();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.target.value);
  }, []);

  const handleAddTask = useCallback(() => {
    if (newTaskTitle.length < 1) {
      setErrorMessage("Name should be more than 1 symbols.");
    } else if (uid) {
      dispatch(addTaskAsync({ todolistId, title: newTaskTitle.trim(), uid }));
      setNewTaskTitle("");
      setErrorMessage(null);
    }
  }, [newTaskTitle, uid, todolistId, dispatch]);

  return (
    <>
      <div className={s.taskMenu}>
        <Input type={"text"} onChange={handleInputChange} value={newTaskTitle} />
        <Button useIcon={true} onClick={handleAddTask} />
      </div>
      {errorMessage && <div className={s.errorMessage}>{errorMessage}</div>}
    </>
  );
});
