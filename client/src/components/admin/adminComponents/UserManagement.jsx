import { useContext, useEffect, useState } from "react";
import {
  Card,
  Table,
  Pagination,
  Dropdown,
  Spinner,
  Button,
} from "react-bootstrap";
import { BASE_URL } from "../../common/utilities/initials";
import axios from "axios";
import UserContext from "../../../contexts/UserContext.js";

const UserManagement = () => {
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [roleChanged, setRoleChanged] = useState(false);

  const itemsPerPage = 5;
  const jwt = localStorage.getItem("token");
  const roleMapping = {
    1: "User",
    2: "Uploader",
    3: "Admin",
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/users/all`, config)
      .then((response) => {
        setUsers(response.data);
        setIsLoading(false);
      })
      .catch((e) => console.log(e.message));
  }, [roleChanged]);

  const handleChangeRole = async (userId, newRole) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/users/change-role`,
        {
          userId,
          newRole,
        },
        config
      );
      if (response.status === 200) {
        console.log("User role updated successfully");
        setRoleChanged(!roleChanged);
      } else {
        console.log("Error updating user role");
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  const handleBanUnban = async (userId) => {
    try {
      const newStatus =
        users.find((user) => user._id === userId).status === "banned"
          ? "active"
          : "banned";
      const response = await axios.put(
        `${BASE_URL}/users/change-status`,
        {
          userId,
          newStatus,
        },
        config
      );

      if (response.status === 200) {
        setUsers(
          users.map((user) =>
            user._id === userId ? { ...user, status: newStatus } : user
          )
        );
      } else {
        console.log("Error updating user status");
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  return (
    <Card>
      <Card.Header
        style={{
          color: "black",
          fontSize: "1.5em",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        QUẢN LÝ ACCOUNT
      </Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spinner animation="border" role="status"></Spinner>
            </div>
          ) : (
            <tbody>
              {users
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .filter((userc) => userc._id !== user._id)
                .map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.userName}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>
                      <Dropdown
                        onSelect={(newRole) =>
                          handleChangeRole(user._id, newRole)
                        }
                      >
                        <Dropdown.Toggle
                          id="dropdown-basic"
                          variant="outline-light"
                          style={{
                            fontWeight: "bold",
                            color:
                              user.role === 3
                                ? "red"
                                : user.role === 2
                                ? "orange"
                                : "inherit",
                            backgroundColor: "transparent",
                          }}
                        >
                          {roleMapping[user.role]}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item eventKey={1}>User</Dropdown.Item>
                          <Dropdown.Item eventKey={2}>Uploader</Dropdown.Item>
                          <Dropdown.Item eventKey={3}>Admin</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                    <td>
                      {user.role !== 3 && (
                        <Button
                          variant={
                            user.status === "banned" ? "success" : "danger"
                          }
                          onClick={() => handleBanUnban(user._id)}
                        >
                          {user.status === "banned" ? "Unban" : "Ban"}
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          )}
        </Table>
        <div className="d-flex justify-content-center">
          <Pagination>
            {[...Array(Math.ceil(users.length / itemsPerPage))].map((e, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserManagement;
