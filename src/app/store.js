import { configureStore } from "@reduxjs/toolkit";
import promptReducer from '../feature/prompt/promptSlice'
import chatReducer  from '../feature/chat/chatSlice.js'

export const store = configureStore({
    reducer: {
        prompt: promptReducer, 
        chat: chatReducer,
    }
}) 
