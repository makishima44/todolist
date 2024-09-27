import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v1 } from "uuid";
import {
  addTodolistToFirebase,
  fetchTodolistsFromFirebase,
  removeTodolistFromFirebase,
  updateTodolistTitleInFirebase,
} from "../fireBase/firebaseAction";

export type Todolist = {
  id: string;
  title: string;
};

const initialState: Todolist[] = [];

//------------------------------------Thunk-------------------------------------------//

export const fetchTodolistsAsync = createAsyncThunk(
  "todolists/fetchTodolistsAsync",
  async () => {
    return new Promise<Todolist[]>((resolve) => {
      fetchTodolistsFromFirebase((todolists) => {
        resolve(todolists);
      });
    });
  }
);

export const addTodolistAsync = createAsyncThunk(
  "todolists/addTodolistAsync",
  async (title: string) => {
    const newTodolist: Todolist = {
      id: v1(),
      title,
    };
    await addTodolistToFirebase(newTodolist.id, title);
    return newTodolist;
  }
);

export const removeTodolistAsync = createAsyncThunk(
  "todolists/removeTodolistAsync",
  async (todolistId: string, { dispatch }) => {
    await removeTodolistFromFirebase(todolistId);
    return todolistId;
  }
);

export const updateTodolistTitleAsync = createAsyncThunk(
  "todolists/updateTodolistTitleAsync",
  async (payload: { todolistId: string; title: string }) => {
    await updateTodolistTitleInFirebase(payload.todolistId, payload.title);
    return payload;
  }
);

const todolistsSlice = createSlice({
  name: "todolists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchTodolistsAsync.fulfilled, (state, action) => {
        return [...action.payload];
      })

      .addCase(addTodolistAsync.fulfilled, (state, action) => {
        state.push(action.payload);
      })

      .addCase(removeTodolistAsync.fulfilled, (state, action) => {
        const todolistId = action.payload;
        return state.filter((todolist) => todolist.id !== todolistId);
      })

      .addCase(updateTodolistTitleAsync.fulfilled, (state, action) => {
        const { todolistId, title } = action.payload;
        const todo = state.find((todolist) => todolist.id === todolistId);
        if (todo) {
          todo.title = title;
        }
      });
  },
});

export const todolistsReducer = todolistsSlice.reducer;
