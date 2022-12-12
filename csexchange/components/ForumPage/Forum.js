import { Alert, Card, Col, ListGroup, Row, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Replies from "./Replies";
import Link from "next/link";

const Forum = (props) => {
  const linkToQuestion = "/forum/" + props.id;

  const [solvedClass, setSolvedClass] = useState();
  useEffect(() => {
    if (props.solved) {
      setSolvedClass("success");
    } else if (!props.solved) {
      setSolvedClass("danger");
    }
  }, [props.solved]);
  const nameSurname = props.users.name + " " + props.users.surname;
  return (
    <ListGroup.Item key={props.key}>
      <Card>
        <Row className="ps-2">
          <h2>{props.header}</h2>
        </Row>
        <Row className="ps-2">
          <p>{props.question}</p>
        </Row>
        <Row className="pe-2 d-flex justify-content-end">
          <Col className="d-flex justify-content-end">
            <b>{nameSurname}</b>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="col-2 d-flex justify-content-center align-items-center">
            <Alert
              className="d-flex justify-content-center align-items-center"
              variant={solvedClass}
              style={{
                width: 150,
                height: 150,
              }}
            >
              {props.solved && <b>SOLVED</b>}
              {!props.solved && <b>UNSOLVED</b>}
            </Alert>
          </Col>
          <Col>
            <Replies
              replies={props.replies}
              replyCount={props.replyCount}
              allReplies={props.allReplies}
            ></Replies>
          </Col>
        </Row>
        <Row>
          {!props.allReplies && (
            <Col className="d-flex justify-content-end m-4">
              <Link href={linkToQuestion} legacyBehavior passHref>
                <Button>Go to Thread</Button>
              </Link>
            </Col>
          )}
        </Row>
      </Card>
    </ListGroup.Item>
  );
};

export default Forum;
