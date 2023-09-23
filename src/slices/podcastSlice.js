import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    podcasts :[],
};

const podcastSlice = createSlice({
    name:"podcasts",
    initialState,
    reducers: {
        setPodcasts: (state,action)=>{
            state.podcasts = action.payload;
        },
        getPodcasts: (state,action)=>{
            state.user = action.payload;
        },
        clearPodcasts:(state)=>{
            state.user =null;
        },
    }
});

export const {setPodcasts,getPodcasts,clearPodcasts} = podcastSlice.actions;
export default podcastSlice.reducer;