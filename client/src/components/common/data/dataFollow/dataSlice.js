import { createSlice } from "@reduxjs/toolkit"; 
 
const initialState = {
    loading: false,
    data: [],
    error: null,
}

const apiListFollow = createSlice({
    name: 'listFollow',
    initialState: initialState,
    reducers: {
        fetchFollowStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchFollowSuccess: (state, action) => {
            state.loading = false; 
            state.data = action.payload;
            
        },
        fetchFollowFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

const { reducer, actions } = apiListFollow;
export const { fetchFollowStart, fetchFollowSuccess, fetchFollowFailure } = actions;
export default reducer;