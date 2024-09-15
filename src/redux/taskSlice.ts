import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v1 } from "uuid";

export type StatusTask = "all" | "active" | "complete";

type Task = {
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
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{ todolistId: string; title: string }>
    ) => {
      const { todolistId, title } = action.payload;
      const newTask: Task = {
        id: v1(),
        title,
        status: "active",
      };
      if (!state[todolistId]) {
        state[todolistId] = [];
      }
      state[todolistId].push(newTask);
    },

    removeTask: (
      state,
      action: PayloadAction<{ todolistId: string; taskId: string }>
    ) => {
      const { todolistId, taskId } = action.payload;
      const todolist = state[todolistId];
      if (todolist) {
        state[todolistId] = todolist.filter((task) => task.id !== taskId);
      }
    },

    changeTaskStatus: (
      state,
      action: PayloadAction<{
        todolistId: string;
        taskId: string;
        status: StatusTask;
      }>
    ) => {
      const { todolistId, taskId, status } = action.payload;
      const todolist = state[todolistId];
      const task = todolist.find((task) => task.id === taskId);
      if (task) {
        task.status = status;
      }
    },
    changeTaskTitle: (
      state,
      action: PayloadAction<{
        todolistId: string;
        taskId: string;
        title: string;
      }>
    ) => {
      const { todolistId, taskId, title } = action.payload;
      const todolist = state[todolistId];
      const task = todolist.find((task) => task.id === taskId);
      if (task) {
        task.title = title;
      }
    },
  },
});

export const { addTask, removeTask, changeTaskStatus, changeTaskTitle } =
  taskSlice.actions;
export const tasksReducer = taskSlice.reducer;
