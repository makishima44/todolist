import { createSlice } from "@reduxjs/toolkit";
import { addTodolistAsync, fetchTodolistsAsync, removeTodolistAsync, updateTodolistTitleAsync } from "./todolistThunk";
import { TodolistsState } from "../../types/types";

const initialState: TodolistsState = {
  todolists: [],
  loading: false,
  error: null,
};

const todolistsSlice = createSlice({
  name: "todolists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolistsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodolistsAsync.fulfilled, (state, action) => {
        state.todolists = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodolistsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addTodolistAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodolistAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.todolists.push(action.payload);
      })
      .addCase(addTodolistAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(removeTodolistAsync.fulfilled, (state, action) => {
        const todolistId = action.payload;
        state.todolists = state.todolists.filter((todolist) => todolist.id !== todolistId);
      })
      .addCase(removeTodolistAsync.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(updateTodolistTitleAsync.fulfilled, (state, action) => {
        const { todolistId, title } = action.payload;
        const todo = state.todolists.find((todolist) => todolist.id === todolistId);
        if (todo) {
          todo.title = title;
        }
      })
      .addCase(updateTodolistTitleAsync.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const todolistsReducer = todolistsSlice.reducer;
