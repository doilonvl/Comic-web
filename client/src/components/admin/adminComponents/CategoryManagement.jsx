import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../common/utilities/initials";
import axios from "axios";
import { Button, Card, FormControl, InputGroup } from "react-bootstrap";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/categories/admin`);
        setCategories(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    const addCategory = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/categories`, {
          name: newCategory,
        });
        setCategories((oldCategories) => [...oldCategories, response.data]);
      } catch (error) {
        console.error("Failed to add category", error);
      }
    };

    addCategory();
    setNewCategory("");
  };

  const handleRemoveCategory = async (categoryToRemove) => {
    try {
      await axios.delete(`${BASE_URL}/categories/${categoryToRemove._id}`);
      setCategories(
        categories.filter((category) => category._id !== categoryToRemove._id)
      );
    } catch (error) {
      console.error("Failed to remove category", error);
    }
  };

  const handleToggleCategoryStatus = async (category) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/categories/${category._id}/status`,
        {
          status: category.status === "Active" ? "Inactive" : "Active",
        }
      );
      setCategories(
        categories.map((cat) =>
          cat._id === category._id ? response.data : cat
        )
      );
    } catch (error) {
      console.error("Failed to update category status", error);
    }
  };

  return (
    <Card className="mb-3">
      <Card.Header
        style={{
          color: "black",
          fontSize: "1.5em",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        QUẢN LÝ THỂ LOẠI
      </Card.Header>
      <Card.Body>
        <InputGroup
          className="mb-3"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <FormControl
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button variant="outline-secondary" onClick={handleAddCategory}>
            Add Category
          </Button>
        </InputGroup>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {categories.map((category, index) => (
            <li
              key={index}
              style={{
                display: "inline-block",
                margin: "5px",
                border: "1px solid #007bff",
                borderRadius: "20px",
                padding: "5px",
              }}
            >
              <span
                onClick={() => handleToggleCategoryStatus(category)}
                style={{
                  padding: "5px 10px",
                  backgroundColor:
                    category.status === "Active" ? "green" : "red",
                  color: "white",
                  borderRadius: "20px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
              >
                {category.name}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveCategory(category);
                  }}
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "transparent",
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  x
                </button>
              </span>
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default CategoryManagement;
