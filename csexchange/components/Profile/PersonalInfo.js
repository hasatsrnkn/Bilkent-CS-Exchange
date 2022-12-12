import { Card, Col, Row } from "react-bootstrap";

const PersonalInfo = (props) => {
  return (
      <Row className="ps-4">
        <Col className="text-danger">
          <Row className="mt-3">{props.picture}</Row>
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
