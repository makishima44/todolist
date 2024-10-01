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

export type TodolistsState = {
  todolists: Todolist[];
  loading: boolean;
  error: string | null;
};

const initialState: TodolistsState = {
  todolists: [],
  loading: false,
  error: null,
};

//------------------------------------Thunk-------------------------------------------//

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

const todolistsSlice = createSlice({
  name: "todolists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolistsAsync.pending, (state) => {
        state.loading = true;
        state.error = null; // Сбрасываем ошибку
      })
      .addCase(fetchTodolistsAsync.fulfilled, (state, action) => {
        state.todolists = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodolistsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Сохраняем сообщение об ошибке
      })

      .addCase(addTodolistAsync.pending, (state) => {
        state.loading = true;
        state.error = null; // Сбрасываем ошибку
      })
      .addCase(addTodolistAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.todolists.push(action.payload);
      })
      .addCase(addTodolistAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Сохраняем сообщение об ошибке
      })

      .addCase(removeTodolistAsync.fulfilled, (state, action) => {
        const todolistId = action.payload;
        state.todolists = state.todolists.filter(
          (todolist) => todolist.id !== todolistId
        );
      })
      .addCase(removeTodolistAsync.rejected, (state, action) => {
        state.error = action.payload as string; // Сохраняем сообщение об ошибке
      })

      .addCase(updateTodolistTitleAsync.fulfilled, (state, action) => {
        const { todolistId, title } = action.payload;
        const todo = state.todolists.find(
          (todolist) => todolist.id === todolistId
        );
        if (todo) {
          todo.title = title;
        }
      })
      .addCase(updateTodolistTitleAsync.rejected, (state, action) => {
        state.error = action.payload as string; // Сохраняем сообщение об ошибке
      });
  },
});
export const todolistsReducer = todolistsSlice.reducer;
