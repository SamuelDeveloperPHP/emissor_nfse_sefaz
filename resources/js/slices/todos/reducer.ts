import { createSlice } from "@reduxjs/toolkit";

export const initialState: any = {
  todos: [],
  projects:[],
  error: {},
};

const TodosSlice: any = createSlice({
  name: 'TodosSlice',
  initialState,
  reducers: {
    getTodos: (state: any, action: any) => {
      state.todos = action.payload;
    },

    addTodos: (state: any, action: any) => {
      state.todos.unshift(action.payload);
    },

    deleteTodos: (state: any, action: any) => {
      state.todos = state.todos.filter(
        (todo: any) => (todo.id + "") !== (action.payload + "")
      );
    },

    editTodos: (state: any, action: any) => {
      state.todos = state.todos.map((todo: any) =>
        todo.id.toString() === action.payload.id.toString()
          ? { ...todo, ...action.payload }
          : todo
      );
    },

    getTodoProject: (state: any, action: any) => {
      state.projects = action.payload;
    },

    addProject: (state: any, action: any) => {
      state.projects.push(action.payload);
    },

  },
});

export const { getTodos, addTodos, deleteTodos, editTodos, getTodoProject, addProject } = TodosSlice.actions;

export default TodosSlice.reducer;