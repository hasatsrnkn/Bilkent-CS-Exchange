import PersonalInfo from "../../../components/Profile/PersonalInfo";
import NavbarMenu from "../../../components/UI/NavbarMenu";
import { Col, Row } from "react-bootstrap";
import StudentInfo from "../../../components/Profile/Student/StudentInfo";
import ToDoList from "../../../components/Profile/ToDoList/ToDoList";

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
const studentProfilePage = (props) => {
  return (
    <div>
      <NavbarMenu></NavbarMenu>
      <Row>
        <Col className="col-2">
          <PersonalInfo
            name={student.name}
            id={student.id}
            surname={student.surname}
            picture={student.picture}
            type={student.picture}
            email={student.email}
          ></PersonalInfo>
        </Col>
        <Col className="col-7">
          <StudentInfo
            universityName={student.universityName}
            coordinator={student.coordinator}
            departmentSecretary={student.departmentSecretary}
          ></StudentInfo>
        </Col>
        <Col className="col-3">
          <Row>
            <Col className="d-flex justify-content-center">
              <h2>To-Do List</h2>
            </Col>
          </Row>
          <hr></hr>
          <Row>
            <ToDoList toDoList={student.toDoList}></ToDoList>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default studentProfilePage;
