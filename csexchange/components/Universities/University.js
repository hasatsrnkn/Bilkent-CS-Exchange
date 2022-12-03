import { Card, Col, ListGroup, Row } from "react-bootstrap";

const University = (props) => {
  return (
    <ListGroup.Item>
      <Card>
        <h1 className="text-danger">{props.name}</h1>
        <Row>
          <p>{props.description}</p>
        </Row>
        <Row>
          <Col>
            <h1>*MAP*</h1>
          </Col>
          <Col>
            <Row>
              <h1> rating: {props.rating}</h1>
            </Row>
            <Row>asdsad</Row>
          </Col>
          
        </Row>
      </Card>
    </ListGroup.Item>
  );
};

export default University;
