import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../redux/productsSlice";
import userReducer from "../redux/usersSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
  },
});
