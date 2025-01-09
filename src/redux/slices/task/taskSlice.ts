import { createSlice } from "@reduxjs/toolkit";
import {
  addTaskAsync,
  changeTaskStatusAsync,
  fetchTasksAsync,
  removeTaskAsync,
  updateTaskTitleAsync,
} from "./taskThunk";
import { removeTodolistAsync } from "../todolist/todolistThunk";
import { TasksState } from "../../types/types";

const initialState: TasksState = {
  tasks: {},
  filteredStatus: {},
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setFilter(state, action) {
      const { todolistId, filter } = action.payload;
      state.filteredStatus[todolistId] = filter;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        const { todolistId, tasks } = action.payload;
        state.tasks[todolistId] = tasks;
      })

      .addCase(addTaskAsync.fulfilled, (state, action) => {
        const { todolistId, task } = action.payload;
        if (!state.tasks[todolistId]) {
          state.tasks[todolistId] = [];
        }
        state.tasks[todolistId].push(task);
      })

      .addCase(removeTaskAsync.fulfilled, (state, action) => {
        const { todolistId, taskId } = action.payload;
        state.tasks[todolistId] = state.tasks[todolistId].filter((task) => task.id !== taskId);
      })

      .addCase(updateTaskTitleAsync.fulfilled, (state, action) => {
        const { todolistId, taskId, title } = action.payload;
        const todolist = state.tasks[todolistId];
        const task = todolist.find((task) => task.id === taskId);
        if (task) {
          task.title = title;
        }
      })

      .addCase(changeTaskStatusAsync.fulfilled, (state, action) => {
        const { todolistId, taskId, status } = action.payload;
        const todolist = state.tasks[todolistId];
        const task = todolist.find((task) => task.id === taskId);
        if (task) {
          task.status = status;
        }
      })

      .addCase(removeTodolistAsync.fulfilled, (state, action) => {
        const todolistId = action.payload;
        delete state.tasks[todolistId];
      });
  },
});

export const { setFilter } = taskSlice.actions;
export const tasksReducer = taskSlice.reducer;
