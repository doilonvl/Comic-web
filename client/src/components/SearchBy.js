import { Button, Col, Row } from "react-bootstrap";
import {
  ArrowRepeat,
  ChatFill,
  CloudArrowUpFill,
  EyeFill,
  HeartFill,
  ListUl,
} from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilterStory,
  setSortStory,
} from "./common/data/dataStory/dataSlice";
const SearchBy = () => {
  const dispatch = useDispatch();
  const { sort, filter } = useSelector((state) => state.listStory);
  return (
    <Row className={"pt-2"}>
      <Col xs={12}>
        <h4 className="text-center">Tìm truyện tranh</h4>
      </Col>
      <Col xs={3}></Col>
      <Col xs={9} className="pt-2 pb-3">
        <Row>
          <Col xs={12}>
            <Button
              onClick={() => dispatch(setFilterStory(""))}
              className={`${
                filter.length === 0
                  ? "bg-primary text-white"
                  : "bg-light text-dark"
              } border-0 mx-1`}
            >
              Tất cả
            </Button>
            <Button
              onClick={() => dispatch(setFilterStory("finished"))}
              className={`${
                filter === "finished"
                  ? "bg-primary text-white"
                  : "bg-light text-dark"
              } border-0 mx-1`}
            >
              Hoàn thành
            </Button>
            <Button
              onClick={() => dispatch(setFilterStory("ongoing"))}
              className={`${
                filter === "ongoing"
                  ? "bg-primary text-white"
                  : "bg-light text-dark"
              } border-0 mx-1`}
            >
              Đang tiến hành
            </Button>
          </Col>
        </Row>
      </Col>
      <Col xs={3}>
        <h6>Sắp xếp theo:</h6>
      </Col>
      <Col xs={9}>
        <Button
          onClick={() =>
            dispatch(setSortStory({ type: "updatedAt", payload: !sort }))
          }
          className={`${
            sort.type === "updatedAt"
              ? "bg-warning text-white"
              : "bg-light text-dark"
          } border-0 mx-1 mb-1`}
        >
          <ArrowRepeat
            onClick={() =>
              dispatch(
                setSortStory({
                  type: "updatedAt",
                  payload: !sort,
                })
              )
            }
          />{" "}
          Ngày cập nhật
        </Button>
        <Button
          onClick={() =>
            dispatch(
              setSortStory({
                type: "publishedDate",
                payload: !sort,
              })
            )
          }
          className={`${
            sort.type === "publishedDate"
              ? "bg-warning text-white"
              : "bg-light text-dark"
          } border-0 mx-1 mb-1`}
        >
          <CloudArrowUpFill
            onClick={() =>
              dispatch(
                setSortStory({
                  type: "publishedDate",
                  payload: !sort,
                })
              )
            }
          />{" "}
          Truyện mới
        </Button>
        <Button
          onClick={() =>
            dispatch(setSortStory({ type: "viewCount", payload: !sort }))
          }
          className={`${
            sort.type === "viewCount"
              ? "bg-warning text-white"
              : "bg-light text-dark"
          } border-0 mx-1 mb-1`}
        >
          <EyeFill
            onClick={() =>
              dispatch(
                setSortStory({
                  type: "viewCount",
                  payload: !sort,
                })
              )
            }
          />{" "}
          Top all
        </Button>
        <Button
          onClick={() =>
            dispatch(setSortStory({ type: "followQtt", payload: !sort }))
          }
          className={`${
            sort.type === "followQtt"
              ? "bg-warning text-white"
              : "bg-light text-dark"
          } border-0 mx-1 mb-1`}
        >
          <HeartFill
            onClick={() =>
              dispatch(
                setSortStory({
                  type: "followQtt",
                  payload: !sort,
                })
              )
            }
          />{" "}
          Theo dõi
        </Button>
        <Button
          onClick={() =>
            dispatch(setSortStory({ type: "comment", payload: !sort }))
          }
          className={`${
            sort.type === "comment"
              ? "bg-warning text-white"
              : "bg-light text-dark"
          } border-0 mx-1 mb-1`}
        >
          <ChatFill
            onClick={() =>
              dispatch(setSortStory({ type: "comment", payload: !sort }))
            }
          />{" "}
          Bình luận
        </Button>
        <Button
          onClick={() =>
            dispatch(setSortStory({ type: "chapterQtt", payload: !sort }))
          }
          className={`${
            sort.type === "chapterQtt"
              ? "bg-warning text-white"
              : "bg-light text-dark"
          } border-0 mx-1 mb-1`}
        >
          <ListUl
            onClick={() =>
              dispatch(
                setSortStory({
                  type: "chapterQtt",
                  payload: !sort,
                })
              )
            }
          />{" "}
          Số chương
        </Button>
      </Col>
    </Row>
  );
};

export default SearchBy;
