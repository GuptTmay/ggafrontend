import { createSlice } from "@reduxjs/toolkit";

export const promptSlice = createSlice({
    name: 'prompt',
    initialState: {
        value: ""
    },
    reducers: {
        setPrompt: (state, action) => {
            state.value = action.payload 
        }
    }
}) 

export const { setPrompt } = promptSlice.actions
export default promptSlice.reducer