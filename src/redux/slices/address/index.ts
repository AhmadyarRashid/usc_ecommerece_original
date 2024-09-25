import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AddressState {
  addressList: string[];
}

const initialState: AddressState = {
  addressList: [],
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddressFields: (state, action: PayloadAction<Partial<AddressState>>) => {
      Object.assign(state, action.payload);
    },
    clearAddress: () => initialState,
  },
});

export const { setAddressFields, clearAddress } = addressSlice.actions;
export default addressSlice.reducer;
