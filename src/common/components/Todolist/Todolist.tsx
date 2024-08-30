import { useDispatch, useSelector } from "react-redux";
import { Button } from "../Button/Button";
import s from "./Todolist.module.css";
import {
  changeTodolistTitle,
  removeTodolist,
} from "../../../redux/todolistsSlice";
import { EditableTitle } from "../EditableSpan/EditableSpan";
import { addTask } from "../../../redux/taskSlice";
import { useState } from "react";
import { Input } from "../Input/Input";
import { RootState } from "../../../redux/store";

type TodolistProps = {
  todolistName: string;
  todolistId: string;
};

export const Todolist = ({ todolistName, todolistId }: TodolistProps) => {
  const dispatch = useDispatch();
  const tasks = useSelector(
    (state: RootState) => state.tasks[todolistId] || []
  );
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleDeleteTodolist = () => {
    dispatch(removeTodolist({ id: todolistId }));
  };

  const onChangeTitle = (newTitle: string) => {
    dispatch(changeTodolistTitle({ id: todolistId, title: newTitle }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.target.value);
  };

  const handleAddTask = () => {
    dispatch(addTask({ todolistId, title: newTaskTitle }));
    setNewTaskTitle("");
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
      <div className={s.taskBlock}>
        <Input onChange={handleInputChange} value={newTaskTitle} />
        <Button name={"+"} onClick={handleAddTask} />
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
