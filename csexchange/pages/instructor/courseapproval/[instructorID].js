import { API_BASE_URL } from "../../api/api";
import { Fragment } from "react";
import { Row } from "react-bootstrap";
import NavbarMenu from "../../../components/UI/NavbarMenu";
import StudentListCourseApproval from "../../../components/Instructor/StudentListCourseApproval";

const students = [
  {
    name: "ESIEE Paris",
    courseName: "AEC-422",
    yourCourse: "CS-319",
    approved: true,
  },
  {
    name: "Bamberg University",
    courseName: "AEC-433",
    yourCourse: "CS-319",
    approved: true,
  },
  {
    name: "Bamberg University",
    courseName: "AEC-411",
    yourCourse: "CS-319",
    approved: false,
  },
  {
    name: "Bamberg University",
    courseName: "AEC-41",
    yourCourse: "CS-319",
    approved: true,
  },
];
const CourseApprovalPage = (props) => {
  return (
    <Fragment>
      <NavbarMenu></NavbarMenu>
      <Row>
        <StudentListCourseApproval
          students={students}
        ></StudentListCourseApproval>
      </Row>
    </Fragment>
  );
};

export async function getStaticPaths() {
  const res = await fetch(API_BASE_URL + "all-instructors/");
  const data = await res.json();

  return {
    fallback: false,
    paths: data.map((instructor) => ({
      params: { instructorID: instructor.id.toString() },
    })),
  };
}

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default CourseApprovalPage;
