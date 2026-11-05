import { createSlice } from "@reduxjs/toolkit";

export const initialState:any = {
    transationList: [],
    orderList: [],
};

const Cryptoslice = createSlice({
    name: 'Crypto',
    initialState,
    reducers: {
        getTransationList: (state: any, action: any) => {
            state.transationList = action.payload;
        },
        getOrderList: (state: any, action: any) => {
            state.orderList = action.payload;
    },
}
});
export const { getTransationList, getOrderList } = Cryptoslice.actions;
export default Cryptoslice.reducer;