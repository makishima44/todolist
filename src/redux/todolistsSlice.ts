import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v1 } from "uuid";

export type Todolist = {
  id: string;
  title: string;
};

const initialState: Todolist[] = [];

const todolistsSlice = createSlice({
  name: "todolists",
  initialState,
  reducers: {
    addTodolist: (state, action: PayloadAction<{ title: string }>) => {
      state.push({ id: v1(), title: action.payload.title });
    },
    removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((todolist) => todolist.id !== action.payload.id);
    },
    changeTodolistTitle: (
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) => {
      const todo = state.find((todolist) => todolist.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
      }
    },
  },
});

export const { addTodolist, removeTodolist, changeTodolistTitle } =
  todolistsSlice.actions;
export const todolistsReducer = todolistsSlice.reducer;
