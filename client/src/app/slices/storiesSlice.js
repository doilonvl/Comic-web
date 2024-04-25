import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  stories: {
    data: [],
    total: 0,
  },
  story: {},
};
const storiesSlice = createSlice({
  name: "stories",
  initialState: initialValue,
  reducers: {
    setStory: (state, action) => {
      state.story = action.payload;
    },
  },
});

const { reducer, actions } = storiesSlice;
export const { setStory } = actions;
export default reducer;
