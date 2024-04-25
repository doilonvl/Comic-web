import { Table } from "react-bootstrap";
import { Chat, List, PencilSquare } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckBox from "../../common/custom-fileds/CheckboxField";
import rateAvg from "../../common/utilities/rateAvg";
import SplitNumber from "../../common/utilities/SplitNumber";
import time from "../../time";
import getTime from "../../common/utilities/getTime";
import axios from "axios";
import { BASE_URL } from "../../common/utilities/initials";
import { fetchStoriesSuccess } from "../../common/data/dataStory/dataSlice";

const ListSotry = () => {
  const listStories = useSelector((state) => state.listStory.data);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  const completedStory = (id) => {
    axios
      .get(`${BASE_URL}/story/${id}/finished`, config)
      .then(() => {
        axios
          .get(`${BASE_URL}/story/get_list_stories`, config)
          .then((res) => dispatch(fetchStoriesSuccess(res.data)))
          .catch((e) => console.log(e.message));
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <Table striped bordered size="sm">
      <thead>
        <tr className="text-center">
          <th className="align-middle text-center">#</th>
          <th className="align-middle text-center">Tên truyện</th>
          <th className="align-middle text-center">Thể loại</th>
          <th className="align-middle text-center">Ngày Tạo</th>
          <th className="align-middle text-center">Ngày phát hành</th>
          <th className="align-middle text-center">Lượt đọc</th>
          <th className="align-middle text-center">Hoàn thành</th>
          <th className="align-middle text-center">Kích hoạt</th>
          <th className="align-middle text-center" colSpan={3}>
            Hành động
          </th>
        </tr>
      </thead>
      <tbody>
        {listStories?.map((story, index) => (
          <tr key={story._id}>
            <td className="align-middle text-center">{index + 1}</td>
            <td className="align-middle text-center">{story.name}</td>
            <td className="align-middle text-center">
              {story.category?.map((c) => c.name).join(", ") || "chưa có"}
            </td>
            <td className="align-middle text-center">
              {getTime(story.createdAt)}
            </td>
            <td className="align-middle text-center">
              {story.publishedDate === ""
                ? "Chưa được kích hoạt"
                : time(story.publishedDate)}
            </td>
            <td className="align-middle text-center">
              {SplitNumber(story.viewCount)}
            </td>
            <td className="align-middle text-center">
              <CheckBox
                name="status"
                required={false}
                disabled={story.status === "finished"}
                checked={story.status === "finished"}
                id={story}
                handleOnchange={() => completedStory(story?._id)}
              />
            </td>
            <td className="text-center align-middle">
              <CheckBox
                name="active"
                required={false}
                disabled={true}
                checked={story.isActive}
              />
            </td>
            <td className="text-center align-middle">
              <Link
                to={!story.isActive ? `/author/editstory/${story._id}` : ""}
              >
                <PencilSquare
                  color={!story.isActive ? "black" : "grey"}
                  className="pb-1"
                  size={22}
                />
              </Link>
            </td>
            <td className="text-center align-middle">
              <Link
                to={
                  story.status === "ongoing" || story.status === "draft"
                    ? `/author/mystory/listchapter/${story._id}`
                    : ""
                }
              >
                <List
                  color={
                    story.status === "ongoing" || story.status === "draft"
                      ? "black"
                      : "grey"
                  }
                  className="pb-1"
                  size={22}
                />
              </Link>
            </td>
            <td className="text-center align-middle">
              <Link to={`/author/mystory/${story._id}/boxchat`}>
                <Chat color="black" className="pb-1" size={22} />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ListSotry;
