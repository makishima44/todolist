import React, { memo, useCallback, useState } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { useAppDispatch } from "../../../redux/store";
import { addTaskAsync } from "../../../redux/slices/task/taskThunk";

type TaskMenuProps = { uid: string; todolistId: string };

export const TaskMenu = memo(({ uid, todolistId }: TaskMenuProps) => {
  const dispatch = useAppDispatch();

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.target.value);
  }, []);

  const handleAddTask = useCallback(() => {
    if (newTaskTitle.length < 4) {
      alert("Name should be more than 4 symbols");
    } else if (uid) {
      dispatch(addTaskAsync({ todolistId, title: newTaskTitle.trim(), uid }));
      setNewTaskTitle("");
    }
  }, [newTaskTitle, uid, todolistId, dispatch]);

  return (
    <>
      <Input type={"text"} onChange={handleInputChange} value={newTaskTitle} />
      <Button useIcon={true} onClick={handleAddTask} />
    </>
  );
});
