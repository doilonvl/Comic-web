import { createSlice } from "@reduxjs/toolkit"; 
 
const initialState = {
    loading: false,
    data: [],
    error: null,
}

const apiListRate = createSlice({
    name: 'listRate',
    initialState: initialState,
    reducers: {
        fetchRateStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchRateSuccess: (state, action) => {
            state.loading = false; 
            state.data = action.payload;
            
        },
        fetchRateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

const { reducer, actions } = apiListRate;
export const { fetchRateStart, fetchRateSuccess, fetchRateFailure } = actions;
export default reducer;