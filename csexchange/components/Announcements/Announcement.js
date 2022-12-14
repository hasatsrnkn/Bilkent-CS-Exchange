import { ListGroup, Card, Row, Col } from "react-bootstrap";

const Announcement = (props) => {
  const nameSurname = props.announcer_name + " " + props.announcer_surname;
  const date = new Date(props.date);

  return (
    <ListGroup.Item variant="flush">
      <Card>
        <Row>
          <Col className="col-8 ">
            <Row>
              <h3>{props.context}</h3>
            </Row>
            <Row>
              <big>{props.text}</big>
            </Row>
          </Col>
          <Col className="col-3 d-flex justify-content-center align-items-center">
            {nameSurname}
          </Col>
          <Col className="col-1 d-flex justify-content-center align-items-center">
            <Col>{date.toLocaleDateString()}</Col>
            <Col className="ms-2">
              {date
                .toLocaleTimeString()
                .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}
            </Col>
          </Col>
        </Row>
      </Card>
    </ListGroup.Item>
  );
};

export default Announcement;
