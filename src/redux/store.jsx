import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './api/baseApi'

import { setupListeners } from '@reduxjs/toolkit/query'


// const persistedCartReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer:  {
    [baseApi.reducerPath]: baseApi.reducer,


  } ,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)