
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {addProject, addTodos, deleteTodos, editTodos, getTodoProject, getTodos} from './reducer'
import { todoTaskList , todoCollapse } from "../../common/data";

export const GetData = () => async (dispatch: any) => {
  try {
      dispatch(getTodos(todoTaskList));
  } catch (error) {
      return error;
  }
}

export const onAddNewTodo = (data : any) => async (dispatch: any) => {
  try {
      dispatch(addTodos(data));
      toast.success("Todo Added Successfully", { autoClose: 3000 });
  } catch (error) {
    toast.error("Todo Added Failed", { autoClose: 3000 });
      return error;
  }
}

export const onDeleteTodo = (data : any) => async (dispatch: any) => {
  try {
      dispatch(deleteTodos(data));
      toast.success("Todo Delete Successfully", { autoClose: 3000});
      
  } catch (error) {
    toast.error("Todo Delete Failed", { autoClose: 3000});
      return error;
  }
}

export const onupdateTodo = (data : any) => async (dispatch: any) => {
  try {
      dispatch(editTodos(data));
      toast.success("Todo Updated Successfully", { autoClose: 3000 });
      
  } catch (error) {
    toast.error("Todo Updated Failed", { autoClose: 3000 });
      return error;
  }
}

export const onGetProjects = () => async (dispatch: any) => {
  try {
      dispatch(getTodoProject(todoCollapse));
  } catch (error) {
      return error;
  }
}


export const onAddNewProject = (data : any) => async (dispatch: any) => {
  try {
      dispatch(addProject(data));
      toast.success("Project Added Successfully", { autoClose: 3000 });
  } catch (error) {
    toast.error("Project Added Failed", { autoClose: 3000 });
      return error;
  }
  
}