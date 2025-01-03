import { createAsyncThunk } from "@reduxjs/toolkit";
import { StatusTask, Task } from "./taskSlice";
import { v1 } from "uuid";
import {
  addTaskToFirebase,
  deleteTaskFromFirebase,
  fetchTasksFromFirebase,
  updateTaskStatusInFirebase,
  updateTaskTitleInFirebase,
} from "../fireBase/firebaseAction";

// Асинхронный экшен для загрузки задач
export const fetchTasksAsync = createAsyncThunk(
  "tasks/fetchTasksAsync",
  async ({ uid, todolistId }: { uid: string; todolistId: string }, { dispatch }) => {
    return new Promise<{ todolistId: string; tasks: Task[] }>((resolve) => {
      fetchTasksFromFirebase(uid, todolistId, (tasks) => {
        const tasksArray = tasks ? Object.values(tasks) : [];
        resolve({ todolistId, tasks: tasksArray });
      });
    });
  }
);

// Асинхронный экшен для добавления задачи
export const addTaskAsync = createAsyncThunk(
  "tasks/addTaskAsync",
  async ({ uid, todolistId, title }: { uid: string; todolistId: string; title: string }, { dispatch }) => {
    const newTask: Task = {
      id: v1(),
      title: title,
      status: "active",
    };
    await addTaskToFirebase(uid, todolistId, newTask);
    return { todolistId, task: newTask };
  }
);

// Асинхронный экшен для удаления задачи
export const removeTaskAsync = createAsyncThunk(
  "tasks/removeTaskAsync",
  async ({ uid, todolistId, taskId }: { uid: string; todolistId: string; taskId: string }, { dispatch }) => {
    await deleteTaskFromFirebase(uid, todolistId, taskId);
    return { todolistId, taskId };
  }
);

// Асинхронный экшен для обновления заголовка задачи
export const updateTaskTitleAsync = createAsyncThunk(
  "tasks/updateTaskTitleAsync",
  async (
    { uid, todolistId, taskId, title }: { uid: string; todolistId: string; taskId: string; title: string },
    { dispatch }
  ) => {
    await updateTaskTitleInFirebase(uid, todolistId, taskId, title);
    return { todolistId, taskId, title };
  }
);

// Асинхронный экшен для изменения статуса задачи
export const changeTaskStatusAsync = createAsyncThunk(
  "tasks/changeTaskStatusAsync",
  async (
    { uid, todolistId, taskId, status }: { uid: string; todolistId: string; taskId: string; status: StatusTask },
    { dispatch }
  ) => {
    await updateTaskStatusInFirebase(uid, todolistId, taskId, status);
    return { todolistId, taskId, status };
  }
);
