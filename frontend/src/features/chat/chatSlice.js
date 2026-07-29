import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendChatRequest } from "./chatAPI";

export const sendMessage = createAsyncThunk("chat/sendMessage",
  async (prompt) => {
    return await sendChatRequest(prompt);
  },
);

const initialState = {
  messages: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    clearChat: (state) => {
      state.messages = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push({
          user: action.payload.prompt,
          assistant: action.payload.response,
        });
      })

      .addCase(sendMessage.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong";
      });
  },
});

export const { clearChat } = chatSlice.actions;
export default chatSlice.reducer;
