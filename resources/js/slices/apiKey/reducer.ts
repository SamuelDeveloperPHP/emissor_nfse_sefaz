import { createSlice } from "@reduxjs/toolkit";

export const initialState: any = {
    apiKey: [],
    error: {},
};

const APIKeyslice: any = createSlice({
    name: 'APIKey',
    initialState,
    reducers: {
        getAPIKey: (state:any, action:any) => {
            state.apiKey = action.payload;
        },
    },
});

export const { getAPIKey } = APIKeyslice.actions;

export default APIKeyslice.reducer;