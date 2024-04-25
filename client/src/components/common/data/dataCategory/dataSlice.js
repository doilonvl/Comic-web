import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: null,
  filterCat: "",
};

const apiListCategory = createSlice({
  name: "listCategory",
  initialState: initialState,
  reducers: {
    fetchCategoryStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCategorySuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchCategoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setFilterCate: (state, action) => {
      state.filterCat = action.payload;
    },
  },
});

const { reducer, actions } = apiListCategory;
export const {
  fetchCategoryStart,
  fetchCategorySuccess,
  fetchCategoryFailure,
  setFilterCate,
} = actions;
export default reducer;
