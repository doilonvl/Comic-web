import DefaultTemplate from "../../../templates/DefaultTemplate";
import ListStory from "../../../components/author/myListStory/ListStory";
import { useEffect } from "react";
import { BASE_URL } from "../../../components/common/utilities/initials";
import axios from "axios";
import { fetchStoriesSuccess } from "../../../components/common/data/dataStory/dataSlice";
import { useDispatch } from "react-redux";
const MyListStory = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  useEffect(() => {
    axios
      .get(`${BASE_URL}/story/get_list_stories`, config)
      .then((res) => dispatch(fetchStoriesSuccess(res.data)))
      .catch((e) => console.log(e.message));
  }, [dispatch]);
  return (
    <DefaultTemplate>
      <ListStory />
    </DefaultTemplate>
  );
};

export default MyListStory;
