
import { fetchTransactionAPI } from "@/service/payments/payments.service";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICustomer {
  customer_first_name: string;
  customer_last_name: string;
  customer_email: string;
  customer_phone_number: string;
  customer_address: string;
}

interface IOrder {
  order_article_id: string;
  order_amount: number;
  order_article_price: number;
  order_total: number;
}

interface ICard {
  titular: string;
  tarjeta_number: number;
  verify_code: number;
  expired_date: string;
}

interface ITokens {
  acceptance_token: string;
  personal_data_token: string;
}

export interface ITransactionData {
  customer: ICustomer;
  order: IOrder;
  tarjeta: ICard;
  tokens: ITokens;
}

interface TransactionState {
  items: ITransactionData;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: TransactionState = {
  items: {
    customer: {
      customer_first_name: "",
      customer_last_name: "",
      customer_email: "",
      customer_phone_number: "",
      customer_address: "",
    },
    order: {
      order_article_id: "",
      order_amount: 0,
      order_article_price: 0,
      order_total: 0,
    },
    tarjeta: {
      titular: "",
      tarjeta_number: 0,
      verify_code: 0,
      expired_date: "",
    },
    tokens: {
      acceptance_token: "",
      personal_data_token: "",
    },
  },
  status: "idle",
};

export const fetchTransaction = createAsyncThunk("Transaction/fetchTransaction", async (data:ITransactionData) => {
  const response = await fetchTransactionAPI(data);
  return response;
});

const transactionSlice = createSlice({
  name: "Transaction",
  initialState,
  reducers: {
    addPayment: (state, action: PayloadAction<ITransactionData>) => {
      if (state.items.order.order_article_id !== action.payload.order.order_article_id) {
        state.items.customer.customer_first_name = action.payload.customer.customer_first_name;
        state.items.customer.customer_last_name = action.payload.customer.customer_last_name;
        state.items.customer.customer_email = action.payload.customer.customer_email; 
        state.items.customer.customer_phone_number = action.payload.customer.customer_phone_number;
        state.items.customer.customer_address = action.payload.customer.customer_address;
        state.items.order.order_article_id = action.payload.order.order_article_id;
        state.items.order.order_amount = action.payload.order.order_amount;
        state.items.order.order_article_price = action.payload.order.order_article_price;
        state.items.order.order_total = action.payload.order.order_total;
        state.items.tarjeta.titular = action.payload.tarjeta.titular;
        state.items.tarjeta.tarjeta_number = action.payload.tarjeta.tarjeta_number;
        state.items.tarjeta.verify_code = action.payload.tarjeta.verify_code;
        state.items.tarjeta.expired_date = action.payload.tarjeta.expired_date;
        state.items.tokens.acceptance_token = action.payload.tokens.acceptance_token;
        state.items.tokens.personal_data_token = action.payload.tokens.personal_data_token;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransaction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTransaction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTransaction.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addPayment } = transactionSlice.actions;
export default transactionSlice.reducer;
