import { createAsyncThunk } from "@reduxjs/toolkit";
import { Todolist } from "./todolistsSlice";
import { v1 } from "uuid";
import {
  addTodolistToFirebase,
  fetchTodolistsFromFirebase,
  removeTodolistFromFirebase,
  updateTodolistTitleInFirebase,
} from "../fireBase/firebaseAction";

export const fetchTodolistsAsync = createAsyncThunk(
  "todolists/fetchTodolistsAsync",
  async (_, { rejectWithValue }) => {
    try {
      const todolists = await new Promise<Todolist[]>((resolve) => {
        fetchTodolistsFromFirebase((todolists) => {
          resolve(todolists);
        });
      });
      return todolists;
    } catch (error) {
      return rejectWithValue("Failed to fetch todolists");
    }
  }
);

export const addTodolistAsync = createAsyncThunk(
  "todolists/addTodolistAsync",
  async (title: string, { rejectWithValue }) => {
    try {
      const newTodolist: Todolist = {
        id: v1(),
        title,
      };
      await addTodolistToFirebase(newTodolist.id, title);
      return newTodolist;
    } catch (error) {
      return rejectWithValue("Failed to add todolist");
    }
  }
);

export const removeTodolistAsync = createAsyncThunk(
  "todolists/removeTodolistAsync",
  async (todolistId: string, { rejectWithValue }) => {
    try {
      await removeTodolistFromFirebase(todolistId);
      return todolistId;
    } catch (error) {
      return rejectWithValue("Failed to remove todolist");
    }
  }
);

export const updateTodolistTitleAsync = createAsyncThunk(
  "todolists/updateTodolistTitleAsync",
  async (
    payload: { todolistId: string; title: string },
    { rejectWithValue }
  ) => {
    try {
      await updateTodolistTitleInFirebase(payload.todolistId, payload.title);
      return payload;
    } catch (error) {
      return rejectWithValue("Failed to update todolist title");
    }
  }
);
