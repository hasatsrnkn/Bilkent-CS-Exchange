import { Form, Container, Row, Card, Col } from "react-bootstrap";
const Courses = (props) => {
  return (
    <Row>
      <Col className="col-1 d-flex justify-content-center align-items-center">
        <Form.Group>
          <Form.Label>Course Code</Form.Label>
          <Form.Control type="text"></Form.Control>
        </Form.Group>
      </Col>
      <Col className="col-1 d-flex justify-content-center align-items-center">
        <Form.Group>
          <Form.Label>Course Name</Form.Label>
          <Form.Control type="text"></Form.Control>
        </Form.Group>
      </Col>
      <Col className="col-1 d-flex justify-content-center align-items-center">
        <Form.Group>
          <Form.Label>Credits</Form.Label>
          <Form.Control type="text"></Form.Control>
        </Form.Group>
      </Col>
      <Col className="col-4 d-flex justify-content-center align-items-center">
        <Form.Group>
          <Form.Label>
            Course Code and Name for a Required Course, Elective Group Name for
            an Elective Requirement
          </Form.Label>
          <Form.Control type="text"></Form.Control>
        </Form.Group>
      </Col>
      <Col className="col-1 d-flex justify-content-center align-items-center">
        <Form.Group>
          <Form.Label>Credits</Form.Label>
          <Form.Control type="text"></Form.Control>
        </Form.Group>
      </Col>
      <Col className="col-4 d-flex justify-content-center align-items-center">
        <Form.Group>
          <Form.Label>
            Elective Requirement Exemptions only: Course code(s) of directly
            equivalent course(s), if any **
          </Form.Label>
          <Form.Control type="text"></Form.Control>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default Courses;
