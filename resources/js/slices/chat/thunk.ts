import { chatMessage, messages } from "../../common/data";
import { addMessage, deleteMessage, getDirectContact, getMessages } from "./reducer";

export const onGetDirectContact = () => async (dispatch:any) => {
  try {
      dispatch(getDirectContact(chatMessage));
  } catch (error) {
      return error;
  }
}

export const onGetMessages = () => async (dispatch:any) => {
  try {
      dispatch(getMessages(messages));
  } catch (error) {
      return error;
  }
}

export const onAddMessage = (messages : any) => async (dispatch: any) => {
  try {
      dispatch(addMessage(messages));
  } catch (error) {
      return error;
  }
}

export const onDeleteMessage = (data : any) => async (dispatch: any) => {
  try {
      dispatch(deleteMessage(data));
      
  } catch (error) {
      return error;
  }
}