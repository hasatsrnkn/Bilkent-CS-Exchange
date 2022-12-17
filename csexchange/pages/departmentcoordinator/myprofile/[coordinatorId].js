import NavbarMenu from "../../../components/UI/NavbarMenu";
import { Col, Row } from "react-bootstrap";
import PersonalInfo from "../../../components/Profile/PersonalInfo";
import ToDoList from "../../../components/Profile/ToDoList/ToDoList";
import CoordinatorInfo from "../../../components/Profile/DepartmentCoordinator/CoordinatorInfo";
import { API_BASE_URL } from "../../api/api";
import { Fragment } from "react";
const coordinator = {
  name: "Can",
  surname: "Alkan",
  id: "21212",
  picture: "picture",
  type: "Department Coordinator",
  email: "can.alkan@cs.bilkent.edu.tr",
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
  universities: [
    {
      name: "asdasd uni",
    },
    {
      name: "1aasad uni",
    },
    {
      name: "sadasd uni",
    },
    {
      name: "123123 uni",
    },
  ],
};

const CoordinatorProfilePage = (props) => {
  return (
    <Fragment>
      <NavbarMenu></NavbarMenu>
      <Row>
        <Col className="col-2">
          <PersonalInfo
            name={coordinator.name}
            id={coordinator.id}
            surname={coordinator.surname}
            picture={coordinator.picture}
            type={coordinator.type}
            email={coordinator.email}
          ></PersonalInfo>
        </Col>
        <Col className="col-7">
          <CoordinatorInfo
            universities={coordinator.universities}
          ></CoordinatorInfo>
        </Col>
        <Col className="col-3">
          <Row>
            <Col className="d-flex justify-content-center">
              <h2>To-Do List</h2>
            </Col>
          </Row>
          <hr></hr>
          <Row>
            <ToDoList toDoList={coordinator.toDoList}></ToDoList>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};

export async function getStaticPaths() {
  const res = await fetch(API_BASE_URL+"all-threads/");
  const data = await res.json();

  return {
    fallback: false,
    paths: data.map((coordinator) => ({
      params: { coordinatorId: coordinator.id.toString() },
    })),
  };
}

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default CoordinatorProfilePage;
