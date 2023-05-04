import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

// const initialState = {
//   value: 0,
//   product: [],
//   title: "",
// };

export const getProducts = createAsyncThunk("products/getProducts", async () => {
  try {
    const res = await axios.get("http://localhost:3000/products");
    return res.data;
  } catch (err) {
    console.error(err.message);
  }
});

export const addProduct = createAsyncThunk("products/addProduct", async (title) => {
  try {
    const res = await axios.post("http://localhost:3000/products", { title: title });
    return res.data;
  } catch (err) {
    console.error(err.message);
  }
});

export const handleDelete = createAsyncThunk("products/handleDelete", async (id) => {
  try {
    const res = await axios.delete(`http://localhost:3000/products/${id}`);
    return res.data;
  } catch (err) {
    console.error(err.message);
  }
});

export const updateProduct = createAsyncThunk("products/updateProduct", async ({ id, title }) => {
  try {
    const res = await axios.patch(`http://localhost:3000/products/${id}`, {
      id: id,
      title: title,
    });
    return res.data;
  } catch (err) {
    console.error(err.message);
  }
});

const productEntity = createEntityAdapter({
  selectId: (product) => product.id,
});

const productSlice = createSlice({
  name: "product",
  initialState: productEntity.getInitialState(),
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      productEntity.setAll(state, action.payload);
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      productEntity.addOne(state, action.payload);
    });
    builder.addCase(handleDelete.fulfilled, (state, action) => {
      productEntity.removeOne(state, action.payload);
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      productEntity.updateOne(state, { id: action.payload.id, updates: action.payload });
    });
  },
});

// Action creators are generated for each case reducer function

export const { increment, decrement, incrementByAmount } = productSlice.actions;

export const productSelectors = productEntity.getSelectors((state) => state.product);

export default productSlice.reducer;
