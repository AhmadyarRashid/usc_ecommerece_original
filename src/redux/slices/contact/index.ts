import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ContactState {
  contactInfo: string | null;
}

const initialState: ContactState = {
  contactInfo: null,
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setContactFields: (state, action: PayloadAction<Partial<ContactState>>) => {
      Object.assign(state, action.payload);
    },
    clearContact: () => initialState,
  },
});

export const { setContactFields, clearContact } = contactSlice.actions;
export default contactSlice.reducer;
