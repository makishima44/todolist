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

export const fetchTasksAsync = createAsyncThunk(
  "tasks/fetchTasksAsync",
  async (todolistId: string, { dispatch }) => {
    return new Promise<{ todolistId: string; tasks: Task[] }>((resolve) => {
      fetchTasksFromFirebase(todolistId, (tasks) => {
        const tasksArray = tasks ? Object.values(tasks) : [];
        resolve({ todolistId, tasks: tasksArray });
      });
    });
  }
);

export const addTaskAsync = createAsyncThunk(
  "tasks/addTaskAsync",
  async (payload: { todolistId: string; title: string }, { dispatch }) => {
    const newTask: Task = {
      id: v1(),
      title: payload.title,
      status: "active",
    };
    await addTaskToFirebase(payload.todolistId, newTask);
    return { todolistId: payload.todolistId, task: newTask };
  }
);

export const removeTaskAsync = createAsyncThunk(
  "tasks/removeTaskAsync",
  async (payload: { todolistId: string; taskId: string }, { dispatch }) => {
    await deleteTaskFromFirebase(payload.todolistId, payload.taskId);
    return payload;
  }
);

export const updateTaskTitleAsync = createAsyncThunk(
  "tasks/updateTaskTitleAsync",
  async (payload: { todolistId: string; taskId: string; title: string }) => {
    await updateTaskTitleInFirebase(
      payload.todolistId,
      payload.taskId,
      payload.title
    );
    return payload;
  }
);

export const changeTaskStatusAsync = createAsyncThunk(
  "tasks/changeTaskStatusAsync",
  async (payload: {
    todolistId: string;
    taskId: string;
    status: StatusTask;
  }) => {
    await updateTaskStatusInFirebase(
      payload.todolistId,
      payload.taskId,
      payload.status
    );
    return payload;
  }
);
