import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v1 } from "uuid";
import {
  addTaskToFirebase,
  deleteTaskFromFirebase,
  fetchTasksFromFirebase,
  updateTaskStatusInFirebase,
  updateTaskTitleInFirebase,
} from "../fireBase/firebaseAction";

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

//-------------------------------THUNK------------------------------------------------

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
        state[todolistId] = state[todolistId].filter(
          (task) => task.id !== taskId
        );
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
      });
  },
});

export const tasksReducer = taskSlice.reducer;
