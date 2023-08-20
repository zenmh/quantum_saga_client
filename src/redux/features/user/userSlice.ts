import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../../../utils/firebase";

interface IInitialState {
  user: { email: string | null };
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

interface IUser {
  email: string;
  password: string;
}

const initialState: IInitialState = {
  user: { email: null },
  isLoading: false,
  isError: false,
  error: null,
};

export const createUser = createAsyncThunk(
  "user/createUser",
  async ({ email, password }: IUser) =>
    (await createUserWithEmailAndPassword(auth, email, password)).user.email
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }: IUser) =>
    (await signInWithEmailAndPassword(auth, email, password)).user.email
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string | null>) => {
      state.user.email = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.email = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error.message!;
        state.user.email = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.email = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error.message!;
        state.user.email = null;
      });
  },
});

export const { setUser, setLoading } = userSlice.actions;

export default userSlice.reducer;
