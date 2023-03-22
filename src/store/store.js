import { configureStore } from "@reduxjs/toolkit"
import { userApi } from "./apis/userApi"

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat(userApi.middleware)
})

export default store