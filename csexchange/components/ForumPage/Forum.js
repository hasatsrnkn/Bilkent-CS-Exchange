import { Alert, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
const Forum = (props) => {
  const [solvedClass, setSolvedClass] = useState();
  useEffect(() => {
    if (props.solved) {
      setSolvedClass("success");
    } else if (!props.solved) {
      setSolvedClass("danger");
    }
  }, [props.solved]);
  return (
    <ListGroup.Item>
      <Card>
        <Row>
          <h2>{props.name}</h2>
        </Row>
        <Row>
          <p>{props.description}</p>
        </Row>
        <Row>
          <Col className="col-2 d-flex justify-content-center align-items-center">
            <Alert
              className="d-flex justify-content-center align-items-center"
              variant={solvedClass}
              style={{
                width: 100,
                height: 100,
              }}
            >
              {props.solved && <b>SOLVED</b>}
              {!props.solved && <b>UNSOLVED</b>}
            </Alert>
          </Col>
          <Col >
            <Row>
              <Col className="col-3">
                <h4>{props.replies[0].statedBy}</h4>
              </Col>
              <Col >
                <p>{props.replies[0].context}</p>
              </Col> 
            </Row>
            <Row>
              <Col className="col-3">
                <h4>{props.replies[1].statedBy}</h4>
              </Col>
              <Col>
                <p>{props.replies[1].context}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </ListGroup.Item>
  );
};

export default Forum;
