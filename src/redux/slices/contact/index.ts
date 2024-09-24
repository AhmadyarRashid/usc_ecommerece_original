import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  contactInfo: string | null;
}

const initialState: AuthState = {
  contactInfo: null,
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setContactFields: (state, action: PayloadAction<Partial<AuthState>>) => {
      Object.assign(state, action.payload);
    },
    clearContact: () => initialState,
  },
});

export const { setContactFields, clearContact } = contactSlice.actions;
export default contactSlice.reducer;
