import {
  Button,
  Col,
  Row,
  Card,
  ListGroup,
  Alert,
  Badge,
} from "react-bootstrap";

import StudentList from "./StudentList";

const CoordinatorInfo = (props) => {
  return (
    <Card className="p-2">
      <Row>
        <h1>INFO</h1>
      </Row>
      <Row className="mt-4">
        <Row>
          <h3 className="text-danger">Your Universities</h3>
        </Row>
        <Row className="ms-2">
          <ListGroup as="ol" numbered>
            {props.universities.map((uni) => (
              <ListGroup.Item variant="light" action>
                {uni.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Row>
      </Row>
      <Row className="mt-5">
        <Col className="col-12 d-flex justify-content-center align-items-center">
          <Alert variant="danger">
            Some students added files!
            <Badge className="ms-5" bg="dark">
              +5
            </Badge>
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-end">
          <Button variant="success">Go To Students List</Button>
        </Col>
      </Row>

      <StudentList/>
    </Card>
  );
};
export default CoordinatorInfo;
