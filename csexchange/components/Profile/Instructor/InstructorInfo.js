import {
  Container,
  Row,
  Col,
  ListGroup,
  Badge,
  Alert,
  Button,
  Card,
} from "react-bootstrap";
import Link from "next/link";
const InstructorInfo = (props) => {
  const link = "/instructor/courseapproval/" + props.userID;
  return (
    <Container>
      <Card className="p-2">
        <Row>
          <h1>INFO</h1>
        </Row>
        <Row className="mt-4">
          <Row>
            <h3 className="text-danger">Your Courses</h3>
          </Row>
          <Row className="ms-2">
            <ListGroup as="ol" numbered>
              {props.courses.map((course) => (
                <ListGroup.Item variant="light" action>
                  {course.name}
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
          <Col className="mt-3 d-flex justify-content-center align-items-center">
            <Link href={link} passHref legacyBehavior>
              <Button variant="success" size="lg">
                Course Approval
              </Button>
            </Link>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default InstructorInfo;
