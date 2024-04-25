import { createSlice } from "@reduxjs/toolkit"; 
 
const initialState = {
    loading: false,
    data: [],
    error: null,
}

const dataListUser = createSlice({
    name: 'listUser',
    initialState: initialState,
    reducers: {
        fetchUserStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchUserSuccess: (state, action) => {
            state.loading = false; 
            state.data = action.payload;
            
        },
        fetchUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

const { reducer, actions } = dataListUser;
export const { fetchUserStart, fetchUserSuccess, fetchUserFailure } = actions;
export default reducer;