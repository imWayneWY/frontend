import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { loginApi } from "./api/login";
import { registerApi } from "./api/register";
import { userApi } from "./api/user";
import userReducer from "./slices/user";
import walletReducer from "./slices/wallet";

export const store = configureStore({
    reducer: {
        user: userReducer,
        wallet: walletReducer,
        [loginApi.reducerPath]: loginApi.reducer,
        [registerApi.reducerPath]: registerApi.reducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        loginApi.middleware,
        registerApi.middleware,
        userApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;