import { Fragment } from "react";
import StudentList from "../../../components/DepartmentCoordinator/StudentList";
import NavbarMenu from "../../../components/UI/NavbarMenu";
import { Row } from "react-bootstrap";
import PersonalInfo from "../../../components/Profile/PersonalInfo";
import { API_BASE_URL } from "../../api/api";
const StudentListPage = (props) => {
  return (
    <Fragment>
      <NavbarMenu></NavbarMenu>
      <Row className="mt-4">
        <StudentList firstTime ={false}></StudentList>
      </Row>
    </Fragment>
  );
};

export async function getStaticPaths() {
  const res = await fetch(API_BASE_URL + "all-department-coordinators/");
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

export default StudentListPage;
