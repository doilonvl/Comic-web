import { Col, Row, Spinner } from "react-bootstrap";
import "../UserDetails.css";
import FollowListDetail from "./FollowListDetail";
import CommentDetail from "./CommentDetail";
import { Link } from "react-router-dom";

const CommonDetail = ({ user, setActiveTab }) => {
  if (!user) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">...</span>
        </Spinner>
      </div>
    );
  }
  return (
    <div className="user-page">
      <h1 className="postname">thông tin chung</h1>
      <Row>
        <Col xs={12} md={6}>
          <div className="account-info clearfix">
            <h2 className="posttitle">Thông tin tài khoản</h2>
            <Link className="link" onClick={() => setActiveTab(1)}>
              Chỉnh sửa
            </Link>
            <div className="info-detail">
              <div className="group">
                <div className="label">Username</div>
                <div className="detail">{user.userName}</div>
              </div>
              <div className="group">
                <div className="label">Email</div>
                <div className="detail">{user.email}</div>
              </div>
              <div className="group">
                <div className="label">SĐT</div>
                <div className="detail">{user.phoneNumber}</div>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={12}>
          <FollowListDetail />
        </Col>
        <Col xs={12}>
          <CommentDetail />
        </Col>
      </Row>
    </div>
  );
};

export default CommonDetail;
