import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import authReducer from "./slices/auth";
import contactReducer from "./slices/contact";
import productReducer from "./slices/product";
import categoryReducer from "./slices/category";

const createRootReducer = () =>
  combineReducers({
    auth: authReducer,
    contact: contactReducer,
    product: productReducer,
    category:categoryReducer
  });

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, createRootReducer());

const createDebugger = require("redux-flipper").default;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(createDebugger()),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof createRootReducer>;
