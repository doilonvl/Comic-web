import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "./common/utilities/initials";
import { setFilterCate } from "./common/data/dataCategory/dataSlice";

const ListCategories = () => {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const { filterCat } = useSelector((state) => state.listCategory);
  const lengthCat = Math.ceil(categories.length / 3);
  let countCat = 0;
  useEffect(() => {
    axios
      .get(`${BASE_URL}/categories/all_catergories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err.message));
  }, []);
  const handleOnclickCategory = (e, id) => {
    dispatch(setFilterCate(id));
  };
  return (
    <Row>
      <Col xs={12}>
        <Row>
          <Col xs={12}>
            <h4 className="text-danger fw-bold">Tất Cả</h4>
          </Col>
          <Col xs={12} className={"d-flex"}>
            <div className="w-100">
              <div className="m-0 p-0 d-flex flex-row">
                {Array.from({ length: 3 }, (_, i) => {
                  let index = countCat;
                  return (
                    <div className={`d-flex flex-column`}>
                      {categories.map((category, j) => {
                        if (lengthCat + index > j && j >= index) {
                          countCat += 1;
                          return (
                            <div
                              onClick={(e) =>
                                handleOnclickCategory(e, category._id)
                              }
                              className={`px-3 pt-2 pb-2 border-bottom cursor-pointer custom-cursor name_chapter slider_list_item ${
                                filterCat === category._id
                                  ? "fw-bold text-info"
                                  : ""
                              }`}
                              key={category._id}
                            >
                              {category.name}
                            </div>
                          );
                        }
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ListCategories;
