import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { Spinner } from "react-bootstrap";

const ProtectedRoute = ({ redirectPath, isAllowed, requiresUser = true }) => {
  const { user } = useContext(UserContext);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    if (!requiresUser || user !== null) {
      setLoading(false);
    }
  }, [user, requiresUser]);
  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status" />
      </div>
    );
  }
  return isAllowed ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
