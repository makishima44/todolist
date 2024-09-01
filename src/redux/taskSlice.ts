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
  },
});

export const { addTask, removeTask } = taskSlice.actions;
export const tasksReducer = taskSlice.reducer;
