import { createSlice } from "@reduxjs/toolkit";
import {
  addTaskAsync,
  changeTaskStatusAsync,
  fetchTasksAsync,
  removeTaskAsync,
  updateTaskTitleAsync,
} from "./taskThunk";
import { removeTodolistAsync } from "../todolist/todolistThunk";

export type StatusTask = "all" | "active" | "complete";

export type Task = {
  id: string;
  title: string;
  status: StatusTask;
};

type TasksState = {
  [todolistId: string]: Task[]; // Ключ - id тудулиста, значение - массив задач
};

const initialState: TasksState = {};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        const { todolistId, tasks } = action.payload;
        state[todolistId] = tasks;
      })

      .addCase(addTaskAsync.fulfilled, (state, action) => {
        const { todolistId, task } = action.payload;
        if (!state[todolistId]) {
          state[todolistId] = [];
        }
        state[todolistId].push(task);
      })

      .addCase(removeTaskAsync.fulfilled, (state, action) => {
        const { todolistId, taskId } = action.payload;
        state[todolistId] = state[todolistId].filter((task) => task.id !== taskId);
      })

      .addCase(updateTaskTitleAsync.fulfilled, (state, action) => {
        const { todolistId, taskId, title } = action.payload;
        const todolist = state[todolistId];
        const task = todolist.find((task) => task.id === taskId);
        if (task) {
          task.title = title;
        }
      })

      .addCase(changeTaskStatusAsync.fulfilled, (state, action) => {
        const { todolistId, taskId, status } = action.payload;
        const todolist = state[todolistId];
        const task = todolist.find((task) => task.id === taskId);
        if (task) {
          task.status = status;
        }
      })

      .addCase(removeTodolistAsync.fulfilled, (state, action) => {
        const todolistId = action.payload;
        delete state[todolistId];
      });
  },
});

export const tasksReducer = taskSlice.reducer;
