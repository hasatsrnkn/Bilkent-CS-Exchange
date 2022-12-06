import { ListGroup, Card, Row, Col } from "react-bootstrap";

const Announcement = (props) => {
  return (
    <ListGroup.Item variant="flush" >
      <Card>
        <Row>
          <Col className="col-8 ">{props.description}</Col>
          <Col className="col-3 d-flex justify-content-center align-items-center">
            {props.statedBy}
          </Col>
          <Col className="col-1 d-flex justify-content-center align-items-center">
            {props.date}
          </Col>
        </Row>
      </Card>
    </ListGroup.Item>
  );
};

export default Announcement;
