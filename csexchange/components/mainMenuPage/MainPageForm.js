import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Row } from "react-bootstrap";
import { authActions } from "../../store/auth";
import { useRouter } from 'next/router';

const MainPageForm = (props) => {
  const [bilkentId, setBilkentId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const bilkentIdHandler = (event) => {
    event.preventDefault();
    setBilkentId(event.target.value);
  }

  const passwordHandler = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  }

  const loginHandler = (event) => {
    event.preventDefault();

    dispatch(authActions.login());

    router.push('/student/profile/' + bilkentId );

  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Bilkent ID</Form.Label>
        <Form.Control type="text" onChange={bilkentIdHandler}></Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Your Password</Form.Label>
        <Form.Control type="password" onChange={passwordHandler}></Form.Control>
      </Form.Group>
      <Button
        variant="primary"
        className="mt-3"
        type="submit"
        onClick={loginHandler}
      > 
        Log in
      </Button>
    </Form>
  );
};

export default MainPageForm;
