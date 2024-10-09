import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OrderState {
    orderList: string[];
}

const initialState: OrderState = {
    orderList: [],
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrderFields: (state, action: PayloadAction<Partial<OrderState>>) => {
            Object.assign(state, action.payload);
        },
        clearOrder: () => initialState,
    },
});

export const { setOrderFields, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
