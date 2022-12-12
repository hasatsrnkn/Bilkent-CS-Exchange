import { ListGroup, Row, Col } from "react-bootstrap";

import Announcement from "./Announcement";

const AnnouncementsList = (props) => {
  return (
    <div>
      <Row className="ps-4 text-danger">
        <Col className="col-9">
          <h2>Announcements</h2>
        </Col>
        <Col className="col-2">
          <h2>Stated By</h2>
        </Col>
        <Col className="col-1">
          <h2>Date</h2>
        </Col>
      </Row>
      <ListGroup >
        {props.announcements.map((announ) => (
          <Announcement
            statedBy={announ.statedBy}
            description={announ.description}
            date={announ.date}
          ></Announcement>
        ))}
      </ListGroup>
    </div>
  );
};

export default AnnouncementsList;
