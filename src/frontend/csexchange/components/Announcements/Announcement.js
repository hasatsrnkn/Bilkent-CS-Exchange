import { ListGroup, Card, Row, Col, Figure } from "react-bootstrap";
import bellIcon from "../../assets/bellicon.png";
import { BASE_URL } from "../../pages/api/api";
const Announcement = (props) => {
  const nameSurname = props.announcer_name + " " + props.announcer_surname;
  const date = new Date(props.date);
  const image = BASE_URL + props.announcer_image;
  return (
    <ListGroup.Item variant="flush">
      <Card>
        <Row className="mt-1">
          <Col className="col-8 ">
            <Row>
              <Col className="col-1 ms-4">
                <Figure>
                  <Figure.Image width={30} src={bellIcon.src}></Figure.Image>
                </Figure>
              </Col>
              <Col className="col-3 me-4">
                <h3>{props.context}</h3>
              </Col>
            </Row>
            <Row className="ms-2">
              <big>{props.text}</big>
            </Row>
          </Col>
          <Col className="col-3 d-flex justify-content-center align-items-center">
            
              <Row className="p-3">
                <Figure>
                  <Figure.Image width={80} src={image}></Figure.Image>
                </Figure>
              </Row>
              <Row className="pb-4 ms-2" >{nameSurname}</Row>
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
