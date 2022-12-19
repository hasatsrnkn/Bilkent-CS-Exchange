import { Fragment } from "react";
import { ListGroup, Figure, Row, Col } from "react-bootstrap";
import Rating from "@mui/material/Rating";
import { BASE_URL } from "../../pages/api/api";
const Review = (props) => {
  const fullname = props.userName + " " + props.userSurname;
  const image = BASE_URL + props.image;
  return (
    <ListGroup.Item>
      <Row>
        <Col className="ps-3">
          <Figure className="me-3">
            <Figure.Image width={100} src={image}></Figure.Image>
          </Figure>
          {fullname}
        </Col>
        <Col className="mt-2">{props.text}</Col>
      </Row>
      <Row>
        <Col>
          <Rating precision={0.5} value={props.rating} readOnly />
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default Review;
