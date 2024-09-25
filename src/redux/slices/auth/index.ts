import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  accessToken: string | null;
  userName: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  userName: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthFields: (state, action: PayloadAction<Partial<AuthState>>) => {
      Object.assign(state, action.payload);
    },
    clearAuth: () => initialState,
  },
});

export const { setAuthFields, clearAuth } = authSlice.actions;
export default authSlice.reducer;
