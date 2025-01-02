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
  const uid = useSelector((state: RootState) => state.auth.uid); // Получаем uid из состояния auth
  const tasks = useSelector((state: RootState) => state.tasks[todolistId] || []);

  useEffect(() => {
    if (uid) {
      dispatch(fetchTasksAsync({ todolistId, uid }));
    }
  }, [dispatch, todolistId, uid]);

  const handleDeleteTodolist = () => {
    if (uid) {
      dispatch(removeTodolistAsync({ todolistId, uid }));
      dispatch(fetchTodolistsAsync(uid));
    }
  };

  const handleChangeTodolisTitle = (newTitle: string) => {
    if (uid) {
      dispatch(updateTodolistTitleAsync({ todolistId, title: newTitle, uid }));
    }
  };

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

  const formattedDate = new Date(dateCreated).toLocaleString();

  if (!uid) {
    return <div>Please log in to view your todolists</div>; // Если нет uid, просим пользователя войти
  }

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
