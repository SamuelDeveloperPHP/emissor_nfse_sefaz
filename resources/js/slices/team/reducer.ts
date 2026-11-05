import { createSlice } from "@reduxjs/toolkit";
export const initialState : any= {
    teamData: [],
    error: {},
};

const TeamSlice : any = createSlice({
    name: 'TeamSlice',
    initialState,
    reducers: {
        getTeamData: (state:any, action:any) => {
            state.teamData = action.payload;
        }, 

        addTeamData: (state:any, action: any) => {
            state.teamData.push(action.payload);
        }, 
        
        deleteTeamData: (state:any, action:any) => {
            state.teamData = state.teamData.filter((team : any) => (team.id + "") !== (action.payload + ""));
        },
        
        updateTeamData: (state:any, action:any) => {
            state.teamData = state.teamData.map((team : any) =>
            team.id.toString() === action.payload.id.toString()
                ? { ...team, ...action.payload }
                : team
        );
        },
    },
});
export const { getTeamData, addTeamData, deleteTeamData, updateTeamData } = TeamSlice.actions;
export default TeamSlice.reducer;

