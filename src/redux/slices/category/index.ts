import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CategoryState {
  categoryList: string[];
}

const initialState: CategoryState = {
  categoryList: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryFields: (
      state,
      action: PayloadAction<Partial<CategoryState>>
    ) => {
      Object.assign(state, action.payload);
    },
    clearCategory: () => initialState,
  },
});

export const { setCategoryFields, clearCategory } = categorySlice.actions;
export default categorySlice.reducer;
