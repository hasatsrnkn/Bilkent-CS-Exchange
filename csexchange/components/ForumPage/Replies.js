import { Col, Row, Card } from "react-bootstrap";
const Replies = (props) => {
  var replies = [];
  var nameSurname;
  for (let i = 0; i < props.replyCount; i++) {
    nameSurname =
      props.replies[i].users.name + " " + props.replies[i].users.surname;
    if (!props.allReplies && i > 1) {
      i = props.replyCount + 5;
    } else {
      replies.push(
        <Card className="mt-2">
          <Row>
            <Col className="col-3 ps-4 d-flex align-items-center">
              <h5>{nameSurname}</h5>
            </Col>
            <Col>
              <p>{props.replies[i].text}</p>
            </Col>
          </Row>
        </Card>
      );
    }
  }

  return <div>{replies}</div>;
};

export default Replies;
