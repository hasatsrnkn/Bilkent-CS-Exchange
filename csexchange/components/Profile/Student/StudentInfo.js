import { Button, Col, Row, Card } from "react-bootstrap";

const StudentInfo = (props) => {
  return (
    <Card className="p-2">
      <Col>
        <Row>
          <h1>INFO</h1>
        </Row>
        <Row className="mt-3 pb-5">
          <Col className="col-6">
            <h4>University: {props.universityName} </h4>
          </Col>
          <Col className="col-3">
            <Button variant="secondary">Go To University Page</Button>
          </Col>
          <Col className="col-3">
            <Button variant="danger">Cancel Application</Button>
          </Col>
        </Row>
        <Row className="mt-5 pb-5">
          <Col className="col-6">
            <h4>Coordinator: {props.coordinator}</h4>
          </Col>
          <Col className="col-3">
            <Button variant="secondary">Go To Coordinator Profile</Button>
          </Col>
          <Col className="col-3">
            <Button variant="secondary">Send Message</Button>
          </Col>
        </Row>
        <Row className="mt-5 pb-5">
          <Col className="col-6">
            <h4>Department Secretary: {props.departmentSecretary}</h4>
          </Col>
          <Col className="col-3">
            <Button variant="secondary">Go To Secretary Profile</Button>
          </Col>
          <Col className="col-3">
            <Button variant="secondary">Send Message</Button>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="col-4 d-flex justify-content-center align-items-center">
            <Button variant="success" size="lg">Fill Pre-Approval</Button>
          </Col>
          <Col className="col-4 d-flex justify-content-center align-items-center">
            <Button variant="success" size="lg">Fill Learning Agreement</Button>
          </Col>
          <Col className="col-4 d-flex justify-content-center align-items-center">
            <Button variant="success" size="lg">Go To Files</Button>
          </Col>
        </Row>
      </Col>
    </Card>
  );
};

export default StudentInfo;
