import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: Record<string, any>;
  accessToken: string | null;
  refreshToken: string | null;
  displayOnboarding: boolean;
}

const initialState: AuthState = {
  user: {},
  accessToken: null,
  refreshToken: null,
  displayOnboarding: true,
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
