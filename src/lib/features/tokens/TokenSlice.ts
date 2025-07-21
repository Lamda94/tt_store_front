import { fetchTokensAPI } from "@/service/Tokens/token.service";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAcceptanceUrl {
  presigned_acceptance: tokenData;
  presigned_personal_data_auth: tokenData;
}

export interface tokenData {
  url: string;
  token: string;
}

interface TokensState {
  items: IAcceptanceUrl;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: TokensState = {
  items: {
    presigned_acceptance: {
      url: "",
      token: "",
    },
    presigned_personal_data_auth: {
      url: "",
      token: "",
    },
  },
  status: "idle",
};

export const fetchTokens = createAsyncThunk(
  "tokens/fetchTokens",
  async () => {
    const response = await fetchTokensAPI();
    return response;
  }
);

const tokenSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTokens.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTokens.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTokens.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default tokenSlice.reducer;
