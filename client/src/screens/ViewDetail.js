import { Col, Row } from "react-bootstrap";
import StoryDetail from "../components/StoryDetail";
import TopViewStories from "../components/TopViewStories";
import DefaultTemplate from "../templates/DefaultTemplate"; 
 
const ViewDetail = () => { 
    return ( 
        <DefaultTemplate>
            <Row className="d-flex justify-content-center">
                <Col xs = {10}>
                    <Row>
                        <Col xs={12}>
                            <Row className="mt-5">
                                <Col xs={8}>
                                    <StoryDetail />
                                </Col>
                                <Col xs={4}>
                                    <TopViewStories />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </DefaultTemplate>
     );
}
 
export default ViewDetail;