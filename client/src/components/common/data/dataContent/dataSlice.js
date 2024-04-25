import { createSlice } from "@reduxjs/toolkit";
import { header, POST, PUT } from "../../utilities/type";

const initialState = {
  loading: false,
  data: [],
  content: {},
  quantity: 0,
  update: 0,
  error: null,
  value: "",
};

const dataListContent = createSlice({
  name: "content",
  initialState: initialState,
  reducers: {
    fetchContentStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchContentSuccess: (state, action) => {
      state.loading = false;
      state.content = action.payload;
    },
    fetchContentsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.quantity = action.payload.length;
    },
    deleteIndex: (state, action) => {
      const { index, contentId } = action.payload;
      state.content.paragraph.splice(index, 1);
      fetch("http://localhost:9999/chapterContent/" + contentId, {
        method: PUT,
        body: JSON.stringify({
          ...state.content,
          paragraph: state.content.paragraph,
        }),
        headers: header,
      });
    },
    createContent: (state, action) => {
      const { storyId, chapterId } = action.payload;
      fetch("http://localhost:9999/chapterContent", {
        method: POST,
        body: JSON.stringify({
          storyId: storyId,
          chapterId: chapterId,
          paragraph: [],
        }),
        headers: header,
      });
      state.quantity = state.data.length + 1;
    },
    addContent: (state, action) => {
      const { value, contentId } = action.payload;
      fetch("http://localhost:9999/chapterContent/" + contentId, {
        method: PUT,
        body: JSON.stringify({
          ...state.content,
          paragraph: [...state.content.paragraph, value.trim()],
        }),
        headers: header,
      });
      state.content = {
        ...state.content,
        paragraph: [...state.content.paragraph, value.trim()],
      };
    },
    fetchContentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setContentValue: (state, action) => {
      if (typeof action.payload === "object") {
        state.value = action.payload.value;
        state.update = action.payload.index;
      } else {
        state.value = action.payload;
      }
    },
    clearAll: (state, action) => {
      state.content.paragraph = [];
      fetch("http://localhost:9999/chapterContent/" + action.payload, {
        method: PUT,
        body: JSON.stringify({
          ...state.content,
          paragraph: [],
        }),
        headers: header,
      });
    },
    updateContentValue: (state, action) => {
      const { value, index, contentId } = action.payload;
      state.content.paragraph = state.content.paragraph.map((p, i) => {
        if (i === index) {
          return value.trim();
        }
        return p;
      });
      state.update = 0;
      fetch("http://localhost:9999/chapterContent/" + contentId, {
        method: PUT,
        body: JSON.stringify({
          ...state.content,
          paragraph: state.content.paragraph.map((p, i) => {
            if (i === index) {
              return value.trim();
            }
            return p;
          }),
        }),
        headers: header,
      });
    },
  },
});

const { reducer, actions } = dataListContent;
export const {
  fetchContentStart,
  fetchContentSuccess,
  fetchContentFailure,
  createContent,
  fetchContentsSuccess,
  addContent,
  deleteIndex,
  setContentValue,
  updateContentValue,
  clearAll,
} = actions;
export default reducer;
