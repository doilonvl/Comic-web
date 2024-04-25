import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  feedbacks: {},
  error: null,
};

const apiListFeedback = createSlice({
  name: "feedback",
  initialState: initialState,
  reducers: {
    fetchFeedbackStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchFeedbackSuccess: (state, action) => {
      state.loading = false;
      state.feedbacks = action.payload;
    },
    fetchFeedbackFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { reducer, actions } = apiListFeedback;
export const {
  fetchFeedbackStart,
  fetchFeedbackSuccess,
  fetchFeedbackFailure,
  postFeedback,
} = actions;
export default reducer;
