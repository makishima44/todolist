import { createAsyncThunk } from "@reduxjs/toolkit";
import { Todolist } from "./todolistsSlice";
import { v1 } from "uuid";
import {
  addTodolistToFirebase,
  fetchTodolistsFromFirebase,
  removeTodolistFromFirebase,
  updateTodolistTitleInFirebase,
} from "../fireBase/firebaseAction";

// Асинхронный экшен для получения тудулистов
export const fetchTodolistsAsync = createAsyncThunk(
  "todolists/fetchTodolistsAsync",
  async (uid: string, { rejectWithValue }) => {
    try {
      const todolists = await new Promise<Todolist[]>((resolve) => {
        fetchTodolistsFromFirebase(uid, (todolists) => {
          resolve(todolists);
        });
      });
      return todolists;
    } catch (error) {
      return rejectWithValue("Failed to fetch todolists");
    }
  }
);

// Асинхронный экшен для добавления нового тудулиста
export const addTodolistAsync = createAsyncThunk(
  "todolists/addTodolistAsync",
  async ({ uid, title }: { uid: string; title: string }, { rejectWithValue }) => {
    try {
      const newTodolist: Todolist = {
        id: v1(),
        title,
        dateCreated: new Date().toISOString(),
      };
      await addTodolistToFirebase(uid, newTodolist.id, title);
      return newTodolist;
    } catch (error) {
      return rejectWithValue("Failed to add todolist");
    }
  }
);

// Асинхронный экшен для удаления тудулиста
export const removeTodolistAsync = createAsyncThunk(
  "todolists/removeTodolistAsync",
  async ({ uid, todolistId }: { uid: string; todolistId: string }, { rejectWithValue }) => {
    try {
      await removeTodolistFromFirebase(uid, todolistId);
      return todolistId;
    } catch (error) {
      return rejectWithValue("Failed to remove todolist");
    }
  }
);

// Асинхронный экшен для обновления заголовка тудулиста
export const updateTodolistTitleAsync = createAsyncThunk(
  "todolists/updateTodolistTitleAsync",
  async ({ uid, todolistId, title }: { uid: string; todolistId: string; title: string }, { rejectWithValue }) => {
    try {
      await updateTodolistTitleInFirebase(uid, todolistId, title);
      return { todolistId, title };
    } catch (error) {
      return rejectWithValue("Failed to update todolist title");
    }
  }
);
