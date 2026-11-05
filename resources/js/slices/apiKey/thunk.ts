import { apiKey } from "../../common/data";
import { getAPIKey } from "./reducer";


export const fetchData = () => async (dispatch: any) => {
    try {
        dispatch(getAPIKey(apiKey));
    } catch (error) {
        return error;
    }
}
