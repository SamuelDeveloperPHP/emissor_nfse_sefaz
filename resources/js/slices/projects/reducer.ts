import { createSlice } from "@reduxjs/toolkit";
export const initialState : any= {
    projectLists: [],
        error: {},
    };
    const ProjectsSlice: any = createSlice({
        name: 'ProjectsSlice',
        initialState,
        reducers: {
            getProjectList: (state: any, action: any) => {
                state.projectLists = action.payload;
            },
            deleteProjectList: (state: any, action: any) => {
                state.projectLists = state.projectLists.filter((item: any) => item.id!== action.payload.id);
            },
        }
    });
    export const { getProjectList, deleteProjectList } = ProjectsSlice.actions;
    export default ProjectsSlice.reducer;
