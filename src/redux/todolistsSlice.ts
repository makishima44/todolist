import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v1 } from "uuid";

type Todolist = {
  id: string;
  name: string;
};

const initialState: Todolist[] = [];

const todolistsSlice = createSlice({
  name: "todolists",
  initialState,
  reducers: {
    addTodolist: (state, action: PayloadAction<{ name: string }>) => {
      state.push({ id: v1(), name: action.payload.name });
    },
    removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((todolist) => todolist.id !== action.payload.id);
    },
  },
});

export const { addTodolist, removeTodolist } = todolistsSlice.actions;
export const todolistsReducer = todolistsSlice.reducer;
