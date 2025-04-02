import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [
        {id: 1, sender: 'bot', text: 'Hello! How can I assist you today?'}    
    ]
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.messages.push({id: state.messages.length + 1, sender: 'user', text: action.payload}) 
        },
        addBot: (state, action) => {
            state.messages.push({id: state.messages.length + 1, sender: 'bot', text: action.payload}) 
        },
        addChart: (state) => {
            state.messages.push({id: state.messages.length + 1, sender: 'server'})
        }

    }
}) 

export const { addUser, addBot, addChart } = chatSlice.actions
export default chatSlice.reducer