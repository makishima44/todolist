import s from "./Todolist.module.css";
import { useSelector } from "react-redux";
import { Button } from "../Button/Button";
import { EditableTitle } from "../EditableTitle/EditableTitle";
import { useEffect, useState } from "react";
import { Input } from "../Input/Input";
import { RootState, useAppDispatch } from "../../../redux/store";
import { Task } from "../Task/Task";
import { addTaskAsync, fetchTasksAsync } from "../../../redux/taskThunk";
import { fetchTodolistsAsync, removeTodolistAsync, updateTodolistTitleAsync } from "../../../redux/todolistThunk";



type TodolistProps = {
  todolistName: string;
  todolistId: string;
  dateCreated: string;
};

export const Todolist = ({ todolistName, todolistId, dateCreated }: TodolistProps) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const dispatch = useAppDispatch();
  const tasks = useSelector((state: RootState) => state.tasks[todolistId] || []);

  useEffect(() => {
    dispatch(fetchTasksAsync(todolistId));
  }, [dispatch, todolistId]);

  const handleDeleteTodolist = () => {
    dispatch(removeTodolistAsync(todolistId));
    dispatch(fetchTodolistsAsync());
  };

  const handleChangeTodolisTitle = (newTitle: string) => {
    dispatch(updateTodolistTitleAsync({ todolistId, title: newTitle }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.target.value);
  };

  const handleAddTask = () => {
    if (newTaskTitle.length < 4) {
      alert("name should be more 4 symbols");
    } else {
      dispatch(addTaskAsync({ todolistId, title: newTaskTitle }));
      setNewTaskTitle("");
    }
  };
  const formattedDate = new Date(dateCreated).toLocaleString();

  return (
    <div className={s.todolist}>
      <div className={s.todolistTitleBlock}>
        <EditableTitle title={todolistName} onChange={handleChangeTodolisTitle}></EditableTitle>
        <Button useIcon={true} onClick={handleDeleteTodolist} type="delete" />
      </div>

      <div className={s.taskBlock}>
        <div className={s.taskMenu}>
          <Input onChange={handleInputChange} value={newTaskTitle} />
          <Button useIcon={true} onClick={handleAddTask} />
        </div>

        <div className={s.taskList}>
          {tasks.map((task) => (
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
      <div className={s.todolistDateCreateBlock}>
        <span className={s.todolistDateCreate}>Created: {formattedDate}</span>
      </div>
    </div>
  );
};
