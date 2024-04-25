import { createSlice } from "@reduxjs/toolkit";
import { header, POST, PUT } from "../../utilities/type";

const initialState = {
  loading: false,
  data: [],
  chapter: {},
  chapterNo: 1,
  quantity: 0,
  error: null,
};

const dataListChapter = createSlice({
  name: "listChapter",
  initialState: initialState,
  reducers: {
    fetchChapterStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchChapterSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.quantity = action.payload.length;
    },
    getChapter: (state, action) => {
      state.loading = false;
      state.chapter = action.payload;
    },
    activeChapter: (state, action) => {
      const chapter = JSON.parse(action.payload);
      fetch("http://localhost:9999/chapter/" + chapter.id, {
        method: PUT,
        body: JSON.stringify({
          ...chapter,
          publishedDate: new Date(),
          active: 1,
        }),
        headers: header,
      });
      state.data = state.data.map((d) =>
        d.id === chapter.id
          ? {
              ...chapter,
              publishedDate: new Date(),
              active: 1,
            }
          : d
      );
    },
    createChapter: (state, action) => {
      const { storyId, chapterNo } = action.payload;
      fetch("http://localhost:9999/chapter", {
        method: POST,
        body: JSON.stringify({
          storyId: storyId,
          chapterNo: chapterNo,
          name: "",
          publishedDate: "",
          active: 0,
        }),
        headers: header,
      });
      state.quantity = state.data.length + 1;
    },
    fetchChapterFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setChapterNo: (state, action) => {
      state.chapterNo = action.payload;
    },
  },
});

const { reducer, actions } = dataListChapter;
export const {
  fetchChapterStart,
  fetchChapterSuccess,
  fetchChapterFailure,
  getChapter,
  setChapterNo,
  createChapter,
  activeChapter,
} = actions;
export default reducer;
