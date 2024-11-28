import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Address {
  id: number;
  name: string;
  street: string;
  city: string;
  state?: string;
  country?: string;
  postalCode?: string;
  isSelected?: boolean;
}

export interface AddressState {
  addressList: Address[];
  selectedAddress: Address | null;
}

const initialState: AddressState = {
  addressList: [],
  selectedAddress: null
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddressFields: (
      state,
      action: PayloadAction<Partial<AddressState>>
    ) => {
      return { ...state, ...action.payload };
    },
    clearAddress: () => initialState,
  },
});

export const { setAddressFields, clearAddress } = addressSlice.actions;
export default addressSlice.reducer;
