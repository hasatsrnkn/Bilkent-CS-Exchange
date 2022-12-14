import { Form, Row, Col, Container, Card } from "react-bootstrap";
import Courses from "./Courses";

const PreApprovalForm = (props) => {
  return (
    <Container>
      <Row>
        <Form>
          <Card className="p-5 m-5">
            <Row>
              <Col className="col-6 d-flex justify-content-center align-items-center">
                <Form.Group>
                  <Form.Label>Name of the host institution</Form.Label>
                  <Form.Control type="text"></Form.Control>
                </Form.Group>
              </Col>
              <Col className="col-6">
                <Row>
                  <Form.Group>
                    <Form.Label>Academic Year</Form.Label>
                    <Form.Control type="text"></Form.Control>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group>
                    <Form.Label>Semester</Form.Label>
                    <Form.Control type="text"></Form.Control>
                  </Form.Group>
                </Row>
              </Col>
            </Row>
          </Card>
          <Row>
            <Courses></Courses>
          </Row>
        </Form>
      </Row>
    </Container>
  );
};

export default PreApprovalForm;
