import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Row, Col, Spinner, Modal } from "react-bootstrap";
import { authActions } from "../../store/auth";
import { loadingActions } from "../../store/loading";
import { useRouter } from "next/router";
import { API_LOGIN_ENDPOINT } from "../../pages/api/api";

const MainPageForm = (props) => {
  const [bilkentId, setBilkentId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const formRef = useRef(null);
  const handleClose = () => {
    setShow(false);
  };

  const bilkentIdHandler = (event) => {
    event.preventDefault();
    setBilkentId(event.target.value);
  };

  const passwordHandler = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const loginHandler = (event) => {
    event.preventDefault();

    dispatch(loadingActions.setIsLoading());
    fetch(API_LOGIN_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        username: bilkentId,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        dispatch(loadingActions.setIsNotLoading());
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        dispatch(
          authActions.login({
            token: data.token,
            type: data.type.toLowerCase(),
            userID: data.id,
          })
        );
        const profileType = data.type.toLowerCase();
        router.push(`${profileType}/myprofile/` + data.id);
      })
      .catch((err) => {
        dispatch(loadingActions.setIsNotLoading());
        setShow(true);
        formRef.current.reset();
      });
  };

  return (
    <div>
      <Row>
        <Form ref={formRef}>
          <Row>
            <Form.Group>
              <Form.Label>Bilkent ID</Form.Label>
              <Form.Control
                name="bilkent_id"
                type="text"
                onChange={bilkentIdHandler}
              ></Form.Control>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group>
              <Form.Label>Your Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                onChange={passwordHandler}
              ></Form.Control>
            </Form.Group>
          </Row>
          <Row>
            <Col className="col-3">
              <Button
                variant="primary"
                className="mt-3"
                type="submit"
                onClick={loginHandler}
              >
                Log in
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Authentication Failed!</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MainPageForm;
