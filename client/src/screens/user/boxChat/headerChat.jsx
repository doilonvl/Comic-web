import { useSelector } from "react-redux";
import getTime from "../../../components/common/utilities/getTime";
import { Link } from "react-router-dom";

const HeaderChat = () => {
  const story = useSelector((state) => state.stories.story);
  return (
    <div
      className="d-flex align-items-center flex-row border-bottom"
      style={{ padding: "10px 0" }}
    >
      <div className="hc_story-image_view">
        <img className="rounded-circle" src={story.image} alt="" />
      </div>
      <div className="d-flex flex-column flx-1">
        <div className="hc_story-name">{story.name}</div>
        <div className="hc_story_detail d-flex flex-row gap-2">
          <span className="detail-time-created">
            {getTime(story.updatedAt)}
          </span>
          <span className="detail-status">{story.status}</span>
        </div>
      </div>
      <div className="btn-back">
        <Link to={`/author/mystory`}>Back</Link>
      </div>
    </div>
  );
};

export default HeaderChat;
