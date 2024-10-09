import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  cartList: string[];
}

const initialState: CartState = {
  cartList: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartFields: (state, action: PayloadAction<Partial<CartState>>) => {
      Object.assign(state, action.payload);
    },
    clearCart: () => initialState,
  },
});

export const { setCartFields, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
