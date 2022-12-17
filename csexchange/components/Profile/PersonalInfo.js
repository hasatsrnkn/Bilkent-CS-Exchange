import { Card, Col, Row, Figure } from "react-bootstrap";
import { BASE_URL } from "../../pages/api/api";

const PersonalInfo = (props) => {
  const picture =  BASE_URL + props.picture;
  console.log(picture);
  return (
    <Row className="ps-4">
      <Col className="text-danger">
        <Row className="mt-3">
          <Figure>
            <Figure.Image width={300} src={picture}></Figure.Image>
          </Figure>
        </Row>
        <Row className="mt-3">Name: {props.name}</Row>
        <Row className="mt-3">Surname: {props.surname}</Row>
        <Row className="mt-3">ID: {props.id}</Row>
        <Row className="mt-3">Type: {props.type}</Row>
        <Row className="mt-3">E-mail: {props.email}</Row>
      </Col>
    </Row>
  );
};

export default PersonalInfo;
