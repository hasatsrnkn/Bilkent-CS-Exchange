import { ListGroup, Row, Card, Col, Button } from "react-bootstrap";
import { useState } from "react";
import { API_NOTIFICATIONS_ENDPOINT } from "../../pages/api/api";
import { useSelector } from "react-redux";

const Notification = (props) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const seenHandler = (event) => {
    event.preventDefault();
    setIsDisabled(true);
    
    const res = fetch(API_NOTIFICATIONS_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        id: props.id,
        seen: true,
      }),
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
  };

  const date = new Date(props.date);
  return (
    <ListGroup.Item key={props.id}>
      <Card>
        <Row>
          <Col className="col-7">{props.text}</Col>
          <Col className="col-3">
            {date.toLocaleDateString()} --
            {date
              .toLocaleTimeString()
              .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}
          </Col>
          <Col className="col-2 d-flex justify-content-end">
            <Button onClick={seenHandler} disabled={isDisabled}>
              Mark As Seen
            </Button>
          </Col>
        </Row>
      </Card>
    </ListGroup.Item>
  );
};

export default Notification;
