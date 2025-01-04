import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  uid: string | null;
  email: string | null;
};

const initialState: AuthState = {
  uid: null,
  email: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ uid: string | null; email: string | null }>) {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
    },

    clearUser(state) {
      state.uid = null;
      state.email = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
