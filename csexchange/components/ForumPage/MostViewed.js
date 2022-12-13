import Link from "next/link";
import {  Row, Col, Nav, Card } from "react-bootstrap";

const MostViewed = (props) => {
    const linkToQuestion = "/forum/" + props.id;
  return (
    <Card>
      <Row>
        <Col className="col-8 d-flex align-items-center">
          <Link href={linkToQuestion} passHref legacyBehavior>
            <Nav.Link variant="danger" eventKey="link-1">
              {props.header}
            </Nav.Link>
          </Link>
        </Col>
        <Col className="col-4 d-flex justify-content-center align-items-center">
          <p>{props.replyCount}</p>
        </Col>
      </Row>
    </Card>
  );
};

export default MostViewed;
