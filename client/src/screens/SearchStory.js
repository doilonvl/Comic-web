import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import ViewList from "../components/common/story/ViewList";
import ListCategories from "../components/ListCategories";
import SearchBy from "../components/SearchBy";
import DefaultTemplate from "../templates/DefaultTemplate";

const SearchStory = () => {
  const [category, setCategory] = useState("");
  const getCategory = (value) => {
    setCategory(value);
  };
  return (
    <DefaultTemplate>
      <Row className="d-flex justify-content-center mt-4">
        <Col xs={10}>
          <Row>
            <Col xs={8}>
              <Row>
                <Col xs={12}>
                  <SearchBy />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <ViewList categoryValue={category} />
                </Col>
              </Row>
            </Col>
            <Col xs={4}>
              <ListCategories handlecategory={getCategory} />
            </Col>
          </Row>
        </Col>
      </Row>
    </DefaultTemplate>
  );
};

export default SearchStory;
