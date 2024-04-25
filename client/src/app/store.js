import { configureStore } from "@reduxjs/toolkit";
import storyReducer from "../components/author/AddEditStory/storySlice";
import userReducer from "../components/user/userSlice";
import listStoryReducer from "../components/common/data/dataStory/dataSlice";
import listCategoryReducer from "../components/common/data/dataCategory/dataSlice";
import listFollowReducer from "../components/common/data/dataFollow/dataSlice";
import listRateReducer from "../components/common/data/dataRate/dataSlice";
import listFeedbackReducer from "../components/common/data/dataBoxChat/dataSlice";
import listUserReducer from "../components/common/data/dataUser/dataSlice";
import listChapterReducer from "../components/common/data/dataChapter/dataSlice";
import contentReducer from "../components/common/data/dataContent/dataSlice";
import storiesReducer from "./slices/storiesSlice";

const rootReducer = {
  stories: storiesReducer,
  story: storyReducer,
  user: userReducer,
  listStory: listStoryReducer,
  listCategory: listCategoryReducer,
  listFollow: listFollowReducer,
  listRate: listRateReducer,
  feedback: listFeedbackReducer,
  listUser: listUserReducer,
  listChapter: listChapterReducer,
  content: contentReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
