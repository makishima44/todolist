import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Определяем тип состояния аутентификации
type AuthState = {
  uid: string | null; // Идентификатор пользователя
  email: string | null; // Email пользователя
};

// Начальное состояние
const initialState: AuthState = {
  uid: null,
  email: null,
};

// Создаем слайс с действиями
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Действие для установки данных пользователя
    setUser(state, action: PayloadAction<{ uid: string | null; email: string | null }>) {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
    },
    // Действие для очистки данных пользователя
    clearUser(state) {
      state.uid = null;
      state.email = null;
    },
  },
});

// Экспортируем действия и редьюсер
export const { setUser, clearUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
