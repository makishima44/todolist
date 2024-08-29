import { useDispatch } from "react-redux";
import { Button } from "../Button/Button";
import s from "./Todolist.module.css";
import {
  changeTodolistTitle,
  removeTodolist,
} from "../../../redux/todolistsSlice";
import { EditableTitle } from "../EditableSpan/EditableSpan";
import { addTask } from "../../../redux/taskSlice";
import { useState } from "react";

type TodolistProps = {
  todolistName: string;
  todolistId: string;
};

export const Todolist = ({ todolistName, todolistId }: TodolistProps) => {
  const dispatch = useDispatch();
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleDeleteTodolist = () => {
    dispatch(removeTodolist({ id: todolistId }));
  };

  const onChangeTitle = (newTitle: string) => {
    dispatch(changeTodolistTitle({ id: todolistId, title: newTitle }));
  };

  const handleAddTask = () => {
    dispatch(addTask({ todolistId, title: newTaskTitle }));
  };

  return (
    <div className={s.todolist}>
      <div className={s.todolistTitleBlock}>
        <EditableTitle
          title={todolistName}
          onChange={onChangeTitle}
        ></EditableTitle>
        <Button name={"X"} onClick={handleDeleteTodolist} />
      </div>
      <div className={s.taskBlock}></div>
    </div>
  );
};
