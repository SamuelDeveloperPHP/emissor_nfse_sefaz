
import { getOrderList, getTransationList } from "./reducer";
import { CryptoOrders, transactions } from "../../common/data";

export const onGetTransationList = () => async (dispatch:any) => {
    try {
        dispatch(getTransationList(transactions));
    } catch (error) {
        return error;
    }
}

export const ongetOrderList = () => async (dispatch:any) => {
    try {
        dispatch(getOrderList(CryptoOrders));
    } catch (error) {
        return error;
    }
}

