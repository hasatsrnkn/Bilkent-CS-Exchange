import { Fragment, useEffect } from "react";
import NavbarMenu from "../../../components/UI/NavbarMenu";
import { Row, Container, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { API_MYPROFILE_STUDENT_ENDPOINT } from "../../api/api";
import { useRouter } from "next/router";
const student = {
  name: "ali",
  surname: "veli",
  id: "21001221",
  picture: "picture",
  type: "Student (Applying)",
  email: "ali.veli@hotmail.com",
  coordinator: "Can Alkan",
  universityName: "Bilkent University",
  departmentSecretary: "Yelda Ateş",
  toDoList: [
    {
      name: "sdasda",
      done: true,
      deadline: "20.01.2020",
    },
    {
      name: "sdasda",
      done: false,
      deadline: "20.01.2020",
    },
  ],
};

const FormerStudentProfilePage = (props) => {
 

  return (
    <Fragment>
      <NavbarMenu></NavbarMenu>
      <Container>
        <Card className="align-items-center justify-content-center">
          <Row className="mt-3 align-items-center justify-content-center">
            <h1>Picture: {student.picture} </h1>
          </Row>
          <Row className="mt-3 align-items-center justify-content-center">
            <h1>Name: {student.name}</h1>
          </Row>
          <Row className="mt-3 align-items-center justify-content-center">
            <h1>Surname: {student.surname}</h1>
          </Row>
          <Row className="mt-3 align-items-center justify-content-center">
            <h1>Bilkent ID:{bilkentId}</h1>
          </Row>
          <Row className="mt-3 align-items-center justify-content-center">
            <h1>Type: {student.type}</h1>
          </Row>
          <Row className="mt-3 align-items-center justify-content-center">
            <h1>E-mail: {student.email}</h1>
          </Row>
          <Row className="mt-3 align-items-center justify-content-center">
            <h1>University Name: {student.universityName}</h1>
          </Row>
          <Row className="mt-3 align-items-center justify-content-center">
            <Button>Review Your University</Button>
          </Row>
        </Card>
      </Container>
    </Fragment>
  );
};

export default FormerStudentProfilePage;
