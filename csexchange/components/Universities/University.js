import { Card, Col, ListGroup, Row } from "react-bootstrap";
import Rating from "@mui/material/Rating";
const University = (props) => {
  return (
    <ListGroup.Item key={props.name}>
      <Card>
        <h1 className="text-danger">{props.name}</h1>
        <Row>
          <p>{props.description}</p>
        </Row>
        <Row className="mt-3">
          <Col>
            <h1>*MAP*</h1>
          </Col>
          <Col>
            <Row>
              <Rating precision={0.5} value={props.rating} readOnly />
            </Row>
            <Row>
              <h5>University Rating</h5>
            </Row>
            <Row>
              <p>girdi girmedi</p>
            </Row>
          </Col>
          <Col>
            <h1>Chart</h1>
          </Col>
          <Col>
            <h1>reviews</h1>
          </Col>
          <Col>go to uni page</Col>
        </Row>
      </Card>
    </ListGroup.Item>
  );
};

export default University;
