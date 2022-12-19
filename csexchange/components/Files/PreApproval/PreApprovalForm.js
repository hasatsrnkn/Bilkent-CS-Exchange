import { Form, Row, Col, Container, Card, Button } from "react-bootstrap";
import { useEffect, useState, useReducer } from "react";
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
  const [courses, setCourses] = useState([initialCourses]);

  const [size, setSize] = useState(1);
  const [host, setHost] = useState(null);
  const [year, setYear] = useState(null);
  const [semester, setSemester] = useState(null);

  //TODO
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(courses);
    const body = {
      size: size,
      academic_year: year,
      semester: semester,
      courses: courses.map((course) => ({
        foreign_code: course.field1,
        foreign_name: course.field2,
        foreign_credit: course.field3,
        code_name: course.field4,
        credit: course.field5,
        exemption: course.field6,
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
                <Form.Group>
                  <Form.Label>Name of the host institution</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={hostHandler}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col className="col-6">
                <Row>
                  <Form.Group>
                    <Form.Label>Academic Year</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={yearHandler}
                    ></Form.Control>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group>
                    <Form.Label>Semester</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={semesterHandler}
                    ></Form.Control>
                  </Form.Group>
                </Row>
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
    </Container>
  );
};

export default PreApprovalForm;
