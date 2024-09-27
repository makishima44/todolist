import { configureStore } from "@reduxjs/toolkit";
import { todolistsReducer } from "./todolistsSlice";
import { tasksReducer } from "./taskSlice";
import { useDispatch } from "react-redux";
export const store = configureStore({
  reducer: {
    todolists: todolistsReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
