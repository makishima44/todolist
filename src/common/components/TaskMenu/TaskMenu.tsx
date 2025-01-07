import React, { useState } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { useAppDispatch } from "../../../redux/store";
import { addTaskAsync } from "../../../redux/slices/task/taskThunk";

type TaskMenuProps = { uid: string; todolistId: string };

export const TaskMenu = ({ uid, todolistId }: TaskMenuProps) => {
  const dispatch = useAppDispatch();

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.target.value);
  };

  const handleAddTask = () => {
    if (newTaskTitle.length < 4) {
      alert("Name should be more than 4 symbols");
    } else if (uid) {
      dispatch(addTaskAsync({ todolistId, title: newTaskTitle, uid }));
      setNewTaskTitle("");
    }
  };

  return (
    <>
      <Input type={"text"} onChange={handleInputChange} value={newTaskTitle} />
      <Button useIcon={true} onClick={handleAddTask} />
    </>
  );
};
