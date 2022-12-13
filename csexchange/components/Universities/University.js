import { Card, Col, ListGroup, Row, Alert, Button } from "react-bootstrap";

import Rating from "@mui/material/Rating";
import { useState, useEffect } from "react";
import Link from "next/link";
const University = (props) => {
  const [entered, setEntered] = useState("danger");

  useEffect(() => {
    if (props.studentPoint - props.threshold > 7) {
      setEntered("success");
    } else if (Math.abs(props.studentPoint - props.threshold) <= 7) {
      setEntered("warning");
    } else if (props.threshold - props.studentPoint > 7) {
      setEntered("danger");
    }
  }, [props.studentPoint]);

  const nameSurname = props.coordinator.name + " " + props.coordinator.surname;
  return (
    <ListGroup.Item key={props.id}>
      <Card>
        <h1 className="text-danger">{props.name}</h1>
        <Row>
          <big>{props.description}</big>
        </Row>
        <Row className="mt-3">
          <Col>
            <Row>
              <h4>Location: {props.location}</h4>
            </Row>
            <Row>
              <h4>Quota: {props.quota}</h4>
            </Row>
            <Row>
              <h4>Coordinator: {nameSurname}</h4>
            </Row>
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
            <Row>
              <h4>Taught In English: {props.taughtInEnglishInfo}</h4>
            </Row>
            <Row>
              <h4>Languages: {props.languageRequirements}</h4>
            </Row>
          </Col>
          <Col>
            <h1>reviews</h1>
          </Col>
          <Col>
            <Link href={props.webSiteLink} passHref legacyBehavior>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="link-item"
              >
                <Button>Go to University Page</Button>
              </a>
            </Link>
          </Col>
        </Row>
      </Card>
    </ListGroup.Item>
  );
};

export default University;
