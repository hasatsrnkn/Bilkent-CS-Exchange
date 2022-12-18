import { Col, Row, Card } from "react-bootstrap";
import { API_BASE_URL } from "../../pages/api/api";
const Replies = (props) => {
  var replies = [];
  var nameSurname;

  for (let i = 0; i < props.replyCount; i = i + 1) {
    if (props.replies[i]) {
      if (!props.allReplies && i > 1) {
        i = props.replyCount + 5;
      } else {
        nameSurname =
          props.replies[i].user.name + " " + props.replies[i].user.surname;
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
  }

  return <div>{replies}</div>;
};

export default Replies;
