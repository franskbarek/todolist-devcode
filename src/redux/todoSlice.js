import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

import { publicRequest } from "../utils/apiCalls";

// const initialState = {
//   value: 0,
//   product: [],
//   title: "",
// };

export const getLists = createAsyncThunk("todos/getLists", async () => {
  try {
    const res = await publicRequest.get("/activity-groups?email=frans@gmail.com");
    return res.data.data;
  } catch (err) {
    console.error(err.message);
  }
});

export const getActivityGroupDetail = createAsyncThunk("todos/getActivityGroupDetail", async (id) => {
  try {
    const res = await publicRequest.get(`/activity-groups/${id}`);
    return res.data;
  } catch (err) {
    console.error(err.message);
  }
});

export const createActivityGroup = createAsyncThunk("todos/createActivityGroup", async () => {
  try {
    const res = await publicRequest.post("/activity-groups", { title: "New Activity", email: "frans@gmail.com" });
    return res.data;
  } catch (err) {
    console.error(err.message);
  }
});

export const deleteActivityGroup = createAsyncThunk("todos/deleteActivityGroup", async (id) => {
  try {
    const res = await publicRequest.delete(`/activity-groups/${id}`);
    return res.data;
  } catch (err) {
    console.error(err.message);
  }
});

// export const updateProduct = createAsyncThunk("products/updateProduct", async ({ id, title }) => {
//   try {
//     const res = await axios.patch(`http://localhost:3000/products/${id}`, {
//       id: id,
//       title: title,
//     });
//     return res.data;
//   } catch (err) {
//     console.error(err.message);
//   }
// });

const todoEntity = createEntityAdapter({
  selectId: (todo) => todo.id,
});

const todoSlice = createSlice({
  name: "todo",
  initialState: todoEntity.getInitialState(),
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
    builder.addCase(getLists.fulfilled, (state, action) => {
      todoEntity.setAll(state, action.payload);
    });
    builder.addCase(getActivityGroupDetail.fulfilled, (state, action) => {
      todoEntity.setOne(state, action.payload);
    });
    builder.addCase(createActivityGroup.fulfilled, (state, action) => {
      todoEntity.addOne(state, action.payload);
    });
    builder.addCase(deleteActivityGroup.fulfilled, (state, action) => {
      todoEntity.removeOne(state, action.payload);
    });
    // builder.addCase(updateProduct.fulfilled, (state, action) => {
    //   productEntity.updateOne(state, { id: action.payload.id, updates: action.payload });
    // });
  },
});

// Action creators are generated for each case reducer function

export const { increment, decrement, incrementByAmount } = todoSlice.actions;

export const todoSelectors = todoEntity.getSelectors((state) => state.todo);

export default todoSlice.reducer;
