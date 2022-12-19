import { useState } from "react";

import { Form, Container, Row, Card, Col, Button } from "react-bootstrap";
const Courses = (props) => {
  const [fields, setFields] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
    field5: "",
  });

  
  const changeHandler = (event, field) => {
    let newFields;
    async function setNewFields() {
      setFields((prevFields) => {
        newFields = { ...prevFields, [field]: event.target.value };
        return newFields;
      });
    }
    setNewFields().then(function (value) {
      props.onChange({ key: props.keyProp, ...newFields });
    });
  };

  //useEffect kullan

  return (
    <Row>
      <Col className="col-1 d-flex justify-content-center align-items-center">
        <Form.Group>
          <Form.Label>Course Code</Form.Label>
          <Form.Control
            type="text"
            value={fields["field1"]}
            onChange={(event) => changeHandler(event, "field1")}
          ></Form.Control>
        </Form.Group>
      </Col>
      <Col className="col-1 d-flex justify-content-center align-items-center">
        <Form.Group>
          <Form.Label>Course Name</Form.Label>
          <Form.Control
            type="text"
            value={fields["field2"]}
            onChange={(event) => changeHandler(event, "field2")}
          ></Form.Control>
        </Form.Group>
      </Col>
      <Col className="col-1 d-flex justify-content-center align-items-center">
        <Form.Group>
          <Form.Label>Credits</Form.Label>
          <Form.Control
            type="text"
            value={fields["field3"]}
            onChange={(event) => changeHandler(event, "field3")}
          ></Form.Control>
        </Form.Group>
      </Col>
      <Col className="col-3 d-flex justify-content-center align-items-center">
        <Form.Group>
          <Form.Label>
            Course Code and Name for a Required Course, Elective Group Name for
            an Elective Requirement
          </Form.Label>
          <Form.Control
            type="text"
            value={fields["field4"]}
            onChange={(event) => changeHandler(event, "field4")}
          ></Form.Control>
        </Form.Group>
      </Col>
      <Col className="col-1 d-flex justify-content-center align-items-center">
        <Form.Group>
          <Form.Label>Credits</Form.Label>
          <Form.Control
            type="text"
            value={fields["field5"]}
            onChange={(event) => changeHandler(event, "field5")}
          ></Form.Control>
        </Form.Group>
      </Col>
      <Col className="col-3 d-flex justify-content-center align-items-center">
        <Form.Group>
          <Form.Label>
            Elective Requirement Exemptions only: Course code(s) of directly
            equivalent course(s), if any **
          </Form.Label>
          <Form.Control
            type="text"
            value={fields["field6"]}
            onChange={(event) => changeHandler(event, "field6")}
          ></Form.Control>
        </Form.Group>
      </Col>
      <Col className="col-2 d-flex justify-content-center align-items-center">
        <Button onClick={props.clickHandler}>Delete</Button>
      </Col>
    </Row>
  );
};

export default Courses;
