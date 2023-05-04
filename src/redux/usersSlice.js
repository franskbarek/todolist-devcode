import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  value: 0,
  currentUser: [],
};

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  try {
    const res = await axios.get("http://localhost:3000/users");
    return res.data;
  } catch (err) {
    console.error(err.message);
  }
});

export const register = createAsyncThunk("users/register", async ({ name, email, password }) => {
  try {
    const res = await axios.post("http://localhost:3000/users", {
      name,
      email,
      password,
    });
    localStorage.setItem("currentUser", JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    console.error(err.message);
  }
});

export const login = createAsyncThunk("users/login", async ({ email, password }) => {
  try {
    const res = await axios.get("http://localhost:3000/users");
    const user = res.data.find((user) => user.email === email && user.password == password);
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      return user;
    }
    console.error("Invalid email or password");
    return null;
  } catch (err) {
    console.error(err.message);
    return null;
  }
});

const userEntity = createEntityAdapter({
  selectId: (user) => user.id,
});

const userSlice = createSlice({
  name: "user",
  initialState: userEntity.getInitialState(),
  reducers: {
    currentUser: (state, action) => {
      state.currentUser = action.payload;
    },
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
    builder.addCase(getUsers.fulfilled, (state, action) => {
      userEntity.setAll(state, action.payload);
    });
    builder.addCase(register.fulfilled, (state, action) => {
      userEntity.addOne(state, action.payload);
    });
    builder.addCase(login.fulfilled, (state, action) => {
      userEntity.setOne(state, action.payload);
    });
  },
});

// Action creators are generated for each case reducer function

export const { increment, decrement, incrementByAmount, currentUser } = userSlice.actions;

export const userSelectors = userEntity.getSelectors((state) => state.user);

export default userSlice.reducer;
