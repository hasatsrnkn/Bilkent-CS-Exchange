import {
  Button,
  Col,
  Row,
  Card,
  ListGroup,
  Alert,
  Badge,
} from "react-bootstrap";
import Link from "next/link";

const CoordinatorInfo = (props) => {
  const link = !props.exchangeCoordinator
    ? "/departmentcoordinator/studentlist/" + props.userID
    : "/exchangecoordinator/studentlist/" + props.userID;

  const link2 = "/departmentcoordinator/approvestudents/" + props.userID;
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
      {props.notificationCount != 0 && (
        <Row className="mt-5">
          <Col className="col-12 d-flex justify-content-center align-items-center">
            <Alert variant="danger">
              Some students added files!
              <Badge className="ms-5" bg="dark">
                {props.notificationCount}
              </Badge>
            </Alert>
          </Col>
        </Row>
      )}

      <Row>
        <Col className="col-6 mt-3 d-flex justify-content-center align-items-center">
          <Link href={link} passHref legacyBehavior>
            <Button variant="success" size="lg">
              See Students List
            </Button>
          </Link>
        </Col>
        <Col className="col-6 d-flex justify-content-center align-items-center">
          <Link href={link2} passHref legacyBehavior>
            <Button variant="success" size="lg">
              Approve Students
            </Button>
          </Link>
        </Col>
      </Row>
    </Card>
  );
};
export default CoordinatorInfo;
