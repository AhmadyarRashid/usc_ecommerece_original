import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductState {
    productList: string[];
    searchedProductList:string[]
}

const initialState: ProductState = {
    productList: [],
    searchedProductList:[]
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProductFields: (state, action: PayloadAction<Partial<ProductState>>) => {
            Object.assign(state, action.payload);
        },
        clearProduct: () => initialState,
    },
});

export const { setProductFields, clearProduct } = productSlice.actions;
export default productSlice.reducer;
