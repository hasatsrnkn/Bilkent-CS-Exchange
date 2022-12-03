import { useState, useRef, useContext } from "react";
import { Button, FloatingLabel, Form, Row } from "react-bootstrap";
const MainPageForm = () => {
  const bilkentIdRef = useRef();
  const passwordRef = useRef();

  return (
    <Form>
      <Form.Group>
        <Form.Label>Bilkent ID</Form.Label>
        <Form.Control type="text"></Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Your Password</Form.Label>
        <Form.Control type="password"></Form.Control>
      </Form.Group>
      <Button variant="primary" className="mt-3" type="submit">
        Log in
      </Button>
    </Form>
  );
};

export default MainPageForm;
