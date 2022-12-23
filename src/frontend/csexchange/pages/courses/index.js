import { Fragment } from "react";
import { Row } from "react-bootstrap";
import CourseList from "../../components/Courses/CourseList";
import { API_COURSES_ENDPOINT } from "../api/api";

import NavbarMenu from "../../components/UI/NavbarMenu";
const CourseApprovalPage = (props) => {
  return (
    <Fragment>
      <NavbarMenu></NavbarMenu>
      <Row>
        <CourseList courses={props.courses}></CourseList>
      </Row>
    </Fragment>
  );
};

export async function getStaticProps() {
  const res = await fetch(API_COURSES_ENDPOINT);
  const data = await res.json();

  /* python manage.py runserver */
  return {
    props: {
      courses: data.map((course) => ({
        department: course.bilkent_course.department,
        uniName: course.foreign_course.university,
        courseName: course.foreign_course.name,
        courseCode: course.foreign_course.code,
        bilkentCourseName: course.bilkent_course.name,
        approve: course.approved_status,
      })),
    },
    revalidate: 1,
  };
}

export default CourseApprovalPage;
