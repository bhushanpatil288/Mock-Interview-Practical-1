import { configureStore } from "@reduxjs/toolkit"
import ticketReducer from "./ticketSlice"
import LocalStorageMiddleware from "./LocalStoreMiddleware"

const store = configureStore({
    reducer: {
        ticket: ticketReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(LocalStorageMiddleware)
});

export default store


/* 

import { configureStore } from "@reduxjs/toolkit";
import ticketReducer from "./ticketSlice";
import { localStorageMiddleware } from "./localStorageMiddleware";

export const store = configureStore({
  reducer: {
    ticket: ticketReducer, // matches state.ticket in the middleware
  },
  // Concatenate your custom middleware with the default toolkit ones
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

*/