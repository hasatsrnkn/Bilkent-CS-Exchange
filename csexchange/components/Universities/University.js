import { Card, Col, ListGroup, Row, Alert } from "react-bootstrap";

import Rating from "@mui/material/Rating";
import { useState, useEffect } from "react";
const University = (props) => {
  const [entered, setEntered] = useState("danger");

  useEffect(() => {
    if (props.studentPoint - props.averagePoint > 7) {
      setEntered("success");
    } else if (Math.abs(props.studentPoint - props.averagePoint) <= 7) {
      setEntered("warning");
    } else if (props.averagePoint - props.studentPoint > 7) {
      setEntered("danger");
    }
  }, [props.studentPoint]);

  return (
    <ListGroup.Item key={props.name}>
      <Card>
        <h1 className="text-danger">{props.name}</h1>
        <Row>
          <p>{props.description}</p>
        </Row>
        <Row className="mt-3">
          <Col>
            <h1>*MAP*</h1>
          </Col>
          <Col>
            <Row>
              <Rating precision={0.5} value={props.rating} readOnly />
            </Row>
            <Row>
              <h5>University Rating</h5>
            </Row>
            <Row>
              <Alert
                className="ms-5"
                variant={entered}
                style={{
                  borderRadius: "50%",
                  width: 50,
                  height: 50,
                }}
              ></Alert>
            </Row>
          </Col>
          <Col>
            <h1>Chart</h1>
          </Col>
          <Col>
            <h1>reviews</h1>
          </Col>
          <Col>go to uni page</Col>
        </Row>
      </Card>
    </ListGroup.Item>
  );
};

export default University;
