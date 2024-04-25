import { useContext, useEffect, useState } from "react";
import { Pagination, Table } from "react-bootstrap";
import "../UserDetails.css";
import { Link } from "react-router-dom";
import { fetchListCommentByUserId } from '../../../api/comment.js'
import UserContext from "../../../contexts/UserContext.js";
import { formatDate } from '../../../util.js'
import { ThemeContext } from '../../../contexts/ThemeContext.js';

const CommentDetail = ({ setActiveTab }) => {
  const { user } = useContext(UserContext)
  const [comments, setComments] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [commentCount] = useState(0);
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    async function getCommentsByUserId(userId, currentPage) {
      const response = await fetchListCommentByUserId(userId, currentPage)
      console.log(response)
      setComments(response.comments)
      setTotalPages(response.totalPages)
      console.log(comments)
    }
    getCommentsByUserId(user?._id, currentPage)
  }, [user, currentPage, commentCount])

  const handlePageChange = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  }

  return (
    <section className={`${theme}`}>
      <div className="position-relative">
        <h2 className="posttitle">Bình luận</h2>
      </div>
      <section className="user-table clearfix">
        <Table responsive variant={theme === 'dark' ? 'dark' : undefined}>
          <thead>
            <tr>
              <th className="nowrap" colSpan={2} style={{ textAlign: 'center' }}>Tên truyện</th>
              <th className="nowrap">Nội dung</th>
              <th className="nowrap">Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {!comments.length > 0 ? 'Bạn chưa có bình luận nào' : ''}
            {comments.map((comment, index) => (
              <tr key={index}>
                <td style={{ display: 'flex', justifyContent: 'center' }}>
                  <img src={comment.storyId?.image} alt={comment.storyId?.name} style={{ width: '80px', height: 'auto' }} />
                </td>
                <td>
                  <Link to={`/get_story/${comment?.storyId?._id}#${comment?._id}`}>
                    {comment.storyId?.name}
                  </Link>
                </td>
                <td>{comment.comment}</td>
                <td className="nowrap">{formatDate(comment.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination className="justify-content-center mt-2">
          {[...Array(totalPages).keys()].map(num => (
            <Pagination.Item key={num + 1} active={num + 1 === currentPage} onClick={() => handlePageChange(num + 1)}>
              {num + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </section>
    </section>
  );
};

export default CommentDetail;
