import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
    taskList: [],
    tasks: [],
    error: {},
};
const TasksSlice = createSlice({
    name: 'TasksSlice',
    initialState,
    reducers: {
        getTaskList: (state: any, action: any) => {
            state.taskList = action.payload;
            state.isTaskCreated = false;
            state.isTaskSuccess = true;
        },

        addNewTask: (state: any, action: any) => {
            state.taskList.push(action.payload);
            state.isTaskCreated = true;
            state.isTaskAdd = true;
            state.isTaskAddFail = false;
        },

        deleteTask: (state: any, action: any) => {
            state.taskList = state.taskList.filter((task: any) => task.id.toString() !== action.payload.toString());
            state.isTaskDelete = true;
            state.isTaskDeleteFail = false;
        },

        updateTask: (state: any, action: any) => {
            state.taskList = state.taskList.map((task: any) =>
                task.id === action.payload.id
                    ? { ...task, ...action.payload }
                    : task
            );
        },


        // kanban board

        getTasks: (state: any, action: any) => {
            state.tasks = action.payload;
        },

        addCardData: (state: any, action: any) => {
            const existingTaskList = state.tasks.find(
                (kanbanList: any) => kanbanList.id === action.payload.kanId
            );
            if (existingTaskList) {
                state.tasks = state.tasks.map((kanbanList: any) => {
                    if (kanbanList.id === action.payload.kanId) {
                        const updatedTaskList = {
                            ...kanbanList,
                            cards: [...kanbanList.cards, action.payload],
                        };
                        return updatedTaskList;
                    }
                    return kanbanList;
                });
            } else {
                state.tasks = [...state.tasks, action.payload];
            }
        },

        updateCardData: (state: any, action: any) => {
            state.tasks = state.tasks.map((task: any) => {
                if (task.id === action.payload.kanId) {
                    return {
                        ...task,
                        cards: task.cards.map((card: any) =>
                            card.id.toString() === action.payload.id.toString()
                                ? { card, ...action.payload }
                                : card
                        ),
                    }
                }
                return task
            })
        },

        deleteKanban: (state: any, action: any) => {
            state.tasks = state.tasks.map((kanbanList: any) => {
                const updatedTaskList = {
                    ...kanbanList,
                    cards: kanbanList.cards.filter((task: any) => {
                        return task.id.toString() !== action.payload.toString();
                    }),
                };
                return updatedTaskList;
            })
        },
    },
});
export const { getTaskList, addNewTask, deleteTask, updateTask, getTasks, addCardData, updateCardData, deleteKanban } = TasksSlice.actions;
export default TasksSlice.reducer;

