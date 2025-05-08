import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ userId, message }) => {
    const res = await axios.post(
      "https://chat-api-bot-backend.onrender.com/chat",
      { userId, message }
    );
    return { sender: "ai", text: res.data.response };
  }
);

export const fetchChatHistory = createAsyncThunk(
  "chat/fetchChatHistory",
  async (userId) => {
    const res = await axios.get(
      `https://chat-api-bot-backend.onrender.com/history/${userId}`
    );
    return res.data;
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    status: "idle",
  },
  reducers: {
    addUserMessage: (state, action) => {
      state.messages.push({ sender: "user", text: action.payload });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.messages = action.payload;
      });
  },
});

export const { addUserMessage } = chatSlice.actions;
export default chatSlice.reducer;
