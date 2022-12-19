import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import syncStorage from "./sync_storage";
import authReducer from "./auth";
import loadingReducer from "./loading";

const reducers = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
});

const persistConfig = {
  key: "root",
  storage: syncStorage,
  blacklist: ["loading"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
