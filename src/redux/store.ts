import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import authReducer from './slices/auth'

// Root reducer
const createRootReducer = () => combineReducers({
  auth:authReducer
});

// Persist config
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, createRootReducer());

// Redux flipper debugger
const createDebugger = require("redux-flipper").default;

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(createDebugger()),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof createRootReducer>;