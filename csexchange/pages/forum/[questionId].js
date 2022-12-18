import NavbarMenu from "../../components/UI/NavbarMenu";
import { Col, Row, Container, Modal, Button, Form } from "react-bootstrap";
import Forum from "../../components/ForumPage/Forum";
import { API_FORUM_ENDPOINT, API_BASE_URL } from "../api/api";
import { Fragment, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

const questionPage = (props) => {
  const token = useSelector((state) => state.auth.token);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const userType = useSelector((state) => state.auth.type);
  const formRef = useRef(null);
  const [text, setText] = useState("");
  const [textIsEmpty, setTextIsEmpty] = useState(false);
  const [show, setShow] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();
  const { questionId } = router.query;

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
    router.push("/forum/" + questionId);
  };

  const textHandler = (event) => {
    event.preventDefault();
    setText(event.target.value);
    setTextIsEmpty(false);
  };

  const markAsSolvedHandler = (event, isSolved) => {
    event.preventDefault();
    const urlAnswered = API_FORUM_ENDPOINT + "thread/answer-question/";
    fetch(urlAnswered, {
      method: "PUT",
      body: JSON.stringify({
        solved: isSolved,
        thread_id: questionId,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    router.push("/forum/" + questionId);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (text == "") {
      setTextIsEmpty(true);
    } else {
      const urlAsked = API_FORUM_ENDPOINT + "thread/answer-question/";
      fetch(urlAsked, {
        method: "POST",
        body: JSON.stringify({
          text: text,
          thread_id: questionId,
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
      <Col className="col-9 ps-3">
        <Row>
          <Forum
            key={props.threads.id}
            id={props.threads.id}
            users={props.threads.users}
            question={props.threads.question}
            date={props.threads.date}
            department={props.threads.department}
            replies={props.threads.replies}
            solved={props.threads.solved}
            header={props.threads.header}
            replyCount={props.threads.replyCount}
            allReplies={props.threads.allReplies}
          ></Forum>
        </Row>
        <Row>
          {authorized && !props.threads.solved && (
            <Container className="ms-4 mt-2">
              <Button onClick={(e) => markAsSolvedHandler(e, true)}>
                Mark As Solved
              </Button>
            </Container>
          )}

          {authorized && props.threads.solved && (
            <Container className="ms-4 mt-2">
              <Button onClick={(e) => markAsSolvedHandler(e, false)}>
                Mark As Unsolved
              </Button>
            </Container>
          )}

          {isAuth && (
            <Container className="p-4">
              <h1>Answer Question</h1>
              <Form ref={formRef}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Answer</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    onChange={textHandler}
                    placeholder="Your Answer"
                    isInvalid={textIsEmpty}
                  />
                </Form.Group>
              </Form>
              <Button onClick={submitHandler} type="submit">
                Add Answer
              </Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h5>
                    <Row>You successfully added an answer!</Row>
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
        </Row>
      </Col>
      <Col className="col-3"></Col>
    </Fragment>
  );
};

export async function getStaticPaths() {
  const res = await fetch(API_BASE_URL + "all-threads/");
  const data = await res.json();

  return {
    fallback: false,
    paths: data.map((question) => ({
      params: { questionId: question.id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const res = await fetch(
    API_FORUM_ENDPOINT + "thread/" + context.params.questionId + "/"
  );
  const data = await res.json();
  return {
    props: {
      threads: {
        users: {
          name: data.user.first_name,
          surname: data.user.last_name,
        },
        header: data.header,
        id: data.id,
        replyCount: data.reply_count,
        question: data.question,
        date: data.start_date,
        department: data.department,
        solved: data.solved,
        allReplies: true,
        replies: data.replies
          ? data.replies.map((reply) => ({
              user: {
                name: reply.user.first_name,
                surname: reply.user.last_name,
                image: reply.user.image,
              },
              text: reply.text,
              date: reply.date,
            }))
          : null,
      },
    },
    revalidate: 1,
  };
}

export default questionPage;
