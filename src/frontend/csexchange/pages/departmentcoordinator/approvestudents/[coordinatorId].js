import { Fragment, useState } from "react";
import NavbarMenu from "../../../components/UI/NavbarMenu";
import { Row } from "react-bootstrap";
import { API_BASE_URL, API_STUDENT_LIST_ENDPOINT } from "../../api/api";
import StudentApproveList from "../../../components/DepartmentCoordinator/ApproveStudentList/StudentApproveList";


const StudentListPage = (props) => {
  return (
    <Fragment>
      <NavbarMenu></NavbarMenu>
      <Row className="mt-4">
        <StudentApproveList></StudentApproveList>
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
