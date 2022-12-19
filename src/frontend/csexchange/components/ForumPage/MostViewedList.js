import { Nav, Row } from "react-bootstrap";
import MostViewed from "./MostViewed";

const MostViewedList = (props) => {
  return (
    <div>
      <Row className="d-flex justify-content-center align-items-center">
        <h2>Most Viewed Questions</h2>
      </Row>
      <Row>
        <Nav className="flex-column">
          {props.questions.map((aQuestion) => (
            <MostViewed
              id={aQuestion.id}
              
              header={aQuestion.header}
              replyCount={aQuestion.replyCount}
            ></MostViewed>
          ))}
        </Nav>
      </Row>
    </div>
  );
};

export default MostViewedList;
