import {
  Form,
  Row,
  Col,
  Container,
  Card,
  Button,
  Modal,
  Alert,
} from "react-bootstrap";
import { useState } from "react";
import Courses from "./Courses";
import { API_PRE_APPROVAL_ENDPOINT } from "../../../pages/api/api";
import { useSelector } from "react-redux";

const PreApprovalForm = (props) => {
  const [keyValue, setKeyValue] = useState(2);

  const emptyFields = {
    field1: "",
    field2: "",
    field3: "",
    field4: "",
    field5: "",
    field6: "",
  };
  const initialCourses = { key: 1, ...emptyFields };

  const token = useSelector((state) => state.auth.token);
  const userID = useSelector((state) => state.auth.userID);
  const [courses, setCourses] = useState([initialCourses]);
  const [show, setShow] = useState(false);
  const [size, setSize] = useState(1);
  const [year, setYear] = useState(null);
  const [semester, setSemester] = useState(null);

  //proplar üzeri next page'e yolla, orada userouterla sayfayı yenile
  const handleClose = () => {
    setShow(false);
  };

  //TODO
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(courses);
    const body = {
      size: size,
      academic_year: year,
      semester: semester,
      courses: courses.map((course) => ({
        foreign_code: course.field1 ? course.field1 : "",
        foreign_name: course.field2 ? course.field2 : "",
        foreign_credit: course.field3 ? course.field3 : "",
        code_name: course.field4 ? course.field4 : "",
        credit: course.field5 ? course.field5 : "",
        exemption: course.field6 ? course.field6 : "",
      })),
    };
    fetch(API_PRE_APPROVAL_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    setShow(true);
  };

  const changeHandler = (updatedCourse) => {
    setCourses((previousCourses) => {
      return previousCourses.map((course) => {
        if (course.key === updatedCourse.key) {
          return updatedCourse;
        } else {
          return course;
        }
      });
    });
  };
  console.log(courses);

  const removeCourseHandler = (key) => {
    setSize(size - 1);
    setCourses((previousCourses) => {
      return previousCourses.filter((course) => course.key !== key); //SHALLOW COPY! PROBLEM?
    });
  };

  const hostHandler = (event) => {
    event.preventDefault();
    setHost(event.target.value);
  };

  const yearHandler = (event) => {
    event.preventDefault();
    setYear(event.target.value);
  };

  const semesterHandler = (event) => {
    event.preventDefault();
    setSemester(event.target.value);
  };

  const addCourseHandler = () => {
    setSize(size + 1);
    setCourses((previousCourses) => {
      if (previousCourses !== null) {
        return [...previousCourses, { key: keyValue, ...emptyFields }];
      } else {
        return [initialCourses];
      }
    });

    setKeyValue(keyValue + 1);
  };

  //useEffect(

  return (
    <Container>
      <Row>
        <Form>
          <Card className="p-5 m-5">
            <Row>
              <Col className="col-6 d-flex justify-content-center align-items-center">
                <Row>
                  <Form.Group>
                    <Form.Label>Academic Year</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={yearHandler}
                    ></Form.Control>
                  </Form.Group>
                </Row>
              </Col>
              <Col className="col-6 d-flex justify-content-center align-items-center">
                <Form.Group>
                  <Form.Label>Semester</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={semesterHandler}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Card>
          <Row>
            {courses.map((course) => {
              return (
                <Courses
                  clickHandler={() => removeCourseHandler(course.key)}
                  key={course.key}
                  keyProp={course.key}
                  onChange={changeHandler}
                ></Courses>
              );
            })}
          </Row>
          <Container>
            <Row>
              <Button onClick={addCourseHandler}>New Course</Button>
            </Row>
            <Row className="mt-5">
              <Button onClick={submitHandler}>Submit</Button>
            </Row>
          </Container>
        </Form>
      </Row>
      <Container>
        <Alert
          variant="danger"
          className="justify-content-center text-center mt-5"
        >
          <Row>
            <b>Warning</b>
          </Row>
          The former file will be deleted when you upload a file!
        </Alert>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>
            <Row>You created pre-approval form successfully!</Row>
          </h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PreApprovalForm;
