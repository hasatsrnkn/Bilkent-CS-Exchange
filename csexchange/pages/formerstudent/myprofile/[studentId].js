import { Fragment, useEffect, useState, useRef } from "react";
import NavbarMenu from "../../../components/UI/NavbarMenu";
import {
  Row,
  Col,
  Container,
  Card,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  API_ALL_FORMER_STUDENTS_ENDPOINT,
  API_MYPROFILE_ENDPOINT,
  API_UNI_REVIEWS_ENDPOINT,
} from "../../api/api";
import { useRouter } from "next/router";
import PersonalInfo from "../../../components/Profile/PersonalInfo";
import Rating from "@mui/material/Rating";

const FormerStudentProfilePage = (props) => {
  const token = useSelector((state) => state.auth.token);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { studentId } = router.query;
  const formRef = useRef(null);
  const [text, setText] = useState("");
  const [textIsEmpty, setTextIsEmpty] = useState(false);
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(2);

  useEffect(() => {
    async function fetchData() {
      fetch(API_MYPROFILE_ENDPOINT, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => {
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
          setUser({
            name: data.first_name,
            surname: data.last_name,
            email: data.email,
            universityName: data.uni_visited.name,
            pictureLink: data.image,
            bilkentID: data.username,
            type: data.user_type,
          });
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    fetchData();
  }, [props, studentId]);

  const handleClose = () => {
    setShow(false);
    router.push("/formerstudent/myprofile/" + studentId);
  };

  const textHandler = (event) => {
    event.preventDefault();
    setText(event.target.value);
    setTextIsEmpty(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (text == "") {
      setTextIsEmpty(true);
    } else {
      const urlAsked = API_UNI_REVIEWS_ENDPOINT + "post-review/";
      fetch(urlAsked, {
        method: "POST",
        body: JSON.stringify({
          text: text,
          rating: value,
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

  if (user) {
    return (
      <Fragment>
        <NavbarMenu></NavbarMenu>
        <Row>
          <Col className="col-2">
            <PersonalInfo
              name={user.name}
              id={user.bilkentID}
              surname={user.surname}
              picture={user.pictureLink}
              type={user.type}
              email={user.email}
            ></PersonalInfo>
          </Col>
          <Col className="col-4 mb-5 d-flex align-items-center">
            <h3>Your University: {user.universityName} </h3>
          </Col>
          <Col className="col-6 mt-5 d-flex justify-content-center">
            <Container className="p-4">
              <h1>Review Your University</h1>
              <Form ref={formRef}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Review</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    onChange={textHandler}
                    placeholder="Your Answer"
                    isInvalid={textIsEmpty}
                  />
                </Form.Group>
              </Form>
              <Rating
                name="half-rating"
                value={value}
                defaultValue={2.5}
                size="large"
                onChange={(event, newValue) => {
                  event.preventDefault();
                  setValue(newValue);
                }}
              />

              <Button className="ms-5" onClick={submitHandler} type="submit">
                Add Review
              </Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h5>
                    <Row>You successfully added a review!</Row>
                  </h5>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </Container>
          </Col>
          <Col className="col-3"></Col>
        </Row>
      </Fragment>
    );
  } else {
    <p>Loading...</p>;
  }
};

export async function getStaticPaths() {
  const res = await fetch(API_ALL_FORMER_STUDENTS_ENDPOINT);
  const data = await res.json();

  return {
    fallback: false,
    paths: data.map((student) => ({
      params: { studentId: student.id.toString() },
    })),
  };
}

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default FormerStudentProfilePage;
