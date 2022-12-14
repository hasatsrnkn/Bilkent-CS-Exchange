import { Form, Row, Col, Container, Card, Button } from "react-bootstrap";
import { useEffect, useState, useReducer } from "react"
import Courses from "./Courses";

const PreApprovalForm = (props) => {

  const emptyFields = {field1: "", field2: "", field3: "", field4: "", field5: "", field6: ""};
  const initialCourses = {key: 1, ...emptyFields}
  
  const [courses, setCourses] = useState([initialCourses]);

  //TODO
  const submitHandler = () => null;

  const changeHandler = (updatedCourse) => {

    setCourses( (previousCourses) => {
      return previousCourses.map( (course) => {
        if(course.key === updatedCourse.key){
          return updatedCourse
        }
        else{
          return course;
        }
      });
    });

  }
  console.log(courses)

  const removeCourseHandler = (key) => {
    setCourses( (previousCourses) => {
      return previousCourses.filter( (course) => course.key !== key ); //SHALLOW COPY! PROBLEM?
    })

  }

  const addCourseHandler = () => {
    setCourses( (previousCourses) => {
      if (previousCourses !== null ){                          
        return [...previousCourses, {key: previousCourses.length+1, ...emptyFields}]; 
      } 
      else{ 
        return [initialCourses]; 
      } 
    });
  }





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
                  <Form.Control type="text"></Form.Control>
                </Form.Group>
              </Col>
              <Col className="col-6">
                <Row>
                  <Form.Group>
                    <Form.Label>Academic Year</Form.Label>
                    <Form.Control type="text"></Form.Control>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group>
                    <Form.Label>Semester</Form.Label>
                    <Form.Control type="text"></Form.Control>
                  </Form.Group>
                </Row>
              </Col>
            </Row>
          </Card>
          <Row>
            {courses.map( (x) =>  {return <Courses clickHandler={() => removeCourseHandler(x.key)} key={x.key} keyProp={x.key} onChange={changeHandler}></Courses>; })}
          </Row>
          <Row>
            <Button onClick={addCourseHandler}>New Course</Button>
          </Row>
          <Row>
            <Button onClick={submitHandler}>Submit</Button>
          </Row>
        </Form>
      </Row>
    </Container>
  );
};

export default PreApprovalForm;
