import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ComplaintState {
  complaintList: [];
}

const initialState: ComplaintState = {
  complaintList: [],
};

export const complaintSlice = createSlice({
  name: "complaint",
  initialState,
  reducers: {
    setComplaintFields: (
      state,
      action: PayloadAction<Partial<ComplaintState>>
    ) => {
      return { ...state, ...action.payload };
    },
    clearComplaint: () => initialState,
  },
});

export const { setComplaintFields, clearComplaint } = complaintSlice.actions;
export default complaintSlice.reducer;
