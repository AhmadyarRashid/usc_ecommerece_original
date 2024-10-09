import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import authReducer, { AuthState } from "./slices/auth";
import contactReducer, { ContactState } from "./slices/contact";
import productReducer, { ProductState } from "./slices/product";
import categoryReducer, { CategoryState } from "./slices/category";
import addressReducer, { AddressState } from "./slices/address";
import orderReducer, { OrderState } from "./slices/order";
import cartReducer, { CartState } from "./slices/cart";

export type RootState = {
  auth: AuthState;
  contact: ContactState;
  product: ProductState;
  category: CategoryState;
  address: AddressState;
  order:OrderState;
  cart:CartState
};

const createRootReducer = () =>
  combineReducers({
    auth: authReducer,
    contact: contactReducer,
    product: productReducer,
    category: categoryReducer,
    address: addressReducer,
    order: orderReducer,
    cart:cartReducer
  });

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "contact", "product", "category", "address","order","cart"],
};

const persistedReducer = persistReducer(persistConfig, createRootReducer());

const createDebugger =
  process.env.NODE_ENV === "development"
    ? require("redux-flipper").default
    : () => {};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(createDebugger ? createDebugger() : []),
});

export const persistor = persistStore(store);
