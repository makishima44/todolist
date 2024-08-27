import { configureStore } from "@reduxjs/toolkit";
import { todolistsReducer } from "./todolistsSlice";
export const store = configureStore({
  reducer: {
    todolists: todolistsReducer,
    // tasks: tasksReducer,
  },
});

// Типизация для Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
