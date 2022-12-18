import NavbarMenu from "../../components/UI/NavbarMenu";
import { Col, Row, Container, Modal, Form, Button } from "react-bootstrap";
import UniversitiesFilter from "../../components/Universities/UniversitiesFilter";
import { useState, useRef } from "react";
import ForumList from "../../components/ForumPage/ForumList";
import MostViewedList from "../../components/ForumPage/MostViewedList";
import { API_ASK_QUESTION_ENPOINT, API_FORUM_ENDPOINT } from "../api/api";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
const forumPage = (props) => {
  const token = useSelector((state) => state.auth.token);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const [header, setHeader] = useState("");
  const [text, setText] = useState("");
  const [headerIsEmpty, setHeaderIsEmpty] = useState(false);
  const [textIsEmpty, setTextIsEmpty] = useState(false);
  const formRef = useRef(null);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [filteredUniDepartment, setFilteredUniDepartment] = useState("cs");

  const filterChangeHandler = (selectedUnis) => {
    setFilteredUniDepartment(selectedUnis);
  };

  const filteredQuestions = props.threads.filter((question) => {
    return question.department.toLocaleLowerCase() == filteredUniDepartment;
  });

  const handleClose = () => {
    setShow(false);
    router.push("/forum/");
  };

  const headerHandler = (event) => {
    event.preventDefault();
    setHeader(event.target.value);
    setHeaderIsEmpty(false);
  };

  const textHandler = (event) => {
    event.preventDefault();
    setText(event.target.value);
    setTextIsEmpty(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const upperFilteredDepartment = filteredUniDepartment.toUpperCase();
    if (header == "" || text == "") {
      if (header == "") {
        setHeaderIsEmpty(true);
      }
      if (text == "") {
        setTextIsEmpty(true);
      }
    } else {
      fetch(API_ASK_QUESTION_ENPOINT, {
        method: "POST",
        body: JSON.stringify({
          header: header,
          department: upperFilteredDepartment,
          question: text,
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
    <div>
      <NavbarMenu></NavbarMenu>
      <Row>
        <Col>
          <UniversitiesFilter
            selected={filteredUniDepartment}
            onChangeFilter={filterChangeHandler}
          ></UniversitiesFilter>
        </Col>
      </Row>
      <Row>
        <Col className="col-9">
          <Row>
            <ForumList forums={filteredQuestions}></ForumList>
          </Row>
          {isAuth && (
            <Container>
              <h1>Ask Question</h1>
              <Form ref={formRef}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Header</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Header"
                    isInvalid={headerIsEmpty}
                    onChange={headerHandler}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Question</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    onChange={textHandler}
                    placeholder="Your Question"
                    isInvalid={textIsEmpty}
                  />
                </Form.Group>
              </Form>
              <Button onClick={submitHandler} type="submit">
                Add Question
              </Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h5>
                    <Row>You successfully added a question!</Row>
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
        </Col>
        <Col className="col-3">
          <MostViewedList
            questions={props.mostViewedQuestions}
          ></MostViewedList>
        </Col>
      </Row>
    </div>
  );
};

export async function getStaticProps() {
  const res1 = await fetch(API_FORUM_ENDPOINT + "home/");
  const homeThreads = await res1.json();

  const res2 = await fetch(API_FORUM_ENDPOINT + "home/most-viewed/");
  const mostViewedThreads = await res2.json();
  return {
    props: {
      threads: homeThreads.map((thread) => ({
        users: {
          name: thread.user.first_name,
          surname: thread.user.last_name,
        },
        header: thread.header,
        id: thread.id,
        replyCount: thread.reply_count,
        question: thread.question,
        date: thread.start_date,
        department: thread.department,
        solved: thread.solved,
        allReplies: false,
        replies: thread.replies
          ? thread.replies.map((reply) => ({
              user: {
                name: reply.user.first_name,
                surname: reply.user.last_name,
              },
              text: reply.text,
              date: reply.date,
            }))
          : null,
      })),
      mostViewedQuestions: mostViewedThreads.map((thread) => ({
        id: thread.id,
        header: thread.header,
        replyCount: thread.reply_count,
      })),
    },
    revalidate: 1,
  };
}

export default forumPage;
