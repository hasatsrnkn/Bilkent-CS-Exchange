import { useRouter } from "next/router";
import { Fragment, useEffect, useState, useRef } from "react";
import { Row, Modal, Form, Container, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import AnnouncementsList from "../../components/Announcements/AnnouncementsList";
import NavbarMenu from "../../components/UI/NavbarMenu";
import {
  API_ANNOUNCEMENTS_ENDPOINT,
  API_MAKE_ANNOUNCEMENT_ENDPOINT,
} from "../api/api";

const AnnouncementsPage = (props) => {
  const userType = useSelector((state) => state.auth.type);
  const token = useSelector((state) => state.auth.token);
  const [authorized, setAuthorized] = useState(false);
  const [context, setContext] = useState("");
  const [text, setText] = useState("");
  const [contextIsEmpty, setContextIsEmpty] = useState(false);
  const [textIsEmpty, setTextIsEmpty] = useState(false);
  const formRef = useRef(null);
  const [show, setShow] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (
      userType == "departmentcoordinator" ||
      userType == "exchangecoordinator"
    ) {
      setAuthorized(true);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    router.push("/announcements/");
  };

  const contextHandler = (event) => {
    event.preventDefault();
    setContextIsEmpty(false);
    setContext(event.target.value);
  };

  const textHandler = (event) => {
    event.preventDefault();
    setTextIsEmpty(false);
    setText(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (context == "" || text == "") {
      if (context == "") {
        setContextIsEmpty(true);
      }
      if (text == "") {
        setTextIsEmpty(true);
      }
    } else {
      fetch(API_MAKE_ANNOUNCEMENT_ENDPOINT, {
        method: "POST",
        body: JSON.stringify({
          context: context,
          text: text,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      
      
      formRef.current.reset();
      setShow(true);
    }
  };

  return (
    <Fragment>
      <NavbarMenu></NavbarMenu>
      <Row>
        <AnnouncementsList
          announcements={props.announcements}
        ></AnnouncementsList>
      </Row>
      {authorized && (
        <Container>
          <h1>Make announcement</h1>
          <Form ref={formRef}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Context</Form.Label>
              <Form.Control
                type="text"
                inputRef
                placeholder="Context"
                onChange={contextHandler}
                isInvalid={contextIsEmpty}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={textHandler}
                placeholder="Text"
                isInvalid={textIsEmpty}
              />
            </Form.Group>
          </Form>
          <Button onClick={submitHandler} type="submit">
            Add Announcement
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5>
                <Row>You successfully issued an announcement!</Row>
              
              </h5>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      )}
    </Fragment>
  );
};

export async function getStaticProps() {
  const res = await fetch(API_ANNOUNCEMENTS_ENDPOINT);
  const data = await res.json();
  /* python manage.py runserver */
  return {
    props: {
      announcements: data.map((announcement) => ({
        announcer_image: announcement.announcer.image,
        announcer_name: announcement.announcer.first_name,
        announcer_surname: announcement.announcer.last_name,
        context: announcement.context,
        text: announcement.text,
        date: announcement.date,
      })),
    },
    revalidate: 1,
  };
}
export default AnnouncementsPage;
