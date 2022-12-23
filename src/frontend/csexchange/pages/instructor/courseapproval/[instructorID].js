import { Fragment, useState, useEffect } from "react";
import StudentListCourseApproval from "../../../components/Instructor/StudentListCourseApproval";
import NavbarMenu from "../../../components/UI/NavbarMenu";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { API_INSTRUCTOR_COURSES_ENDPOINT } from "../../api/api";

const CourseApprovalPage = (props) => {
  const token = useSelector((state) => state.auth.token);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { instructorID } = router.query;

  useEffect(() => {
    async function fetchData() {
      fetch(API_INSTRUCTOR_COURSES_ENDPOINT, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed!";
              // if (data && data.error && data.error.message) {
              //   errorMessage = data.error.message;
              // }

              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          setUser({
            courses: data.map((course) => ({
                id: course.id,
              uniName: course.foreign_course.university,
              courseName: course.foreign_course.name,
              courseCode: course.foreign_course.code,
              bilkentCourseName: course.bilkent_course.name,
              approved: course.approved_status,
            })),
          });
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    fetchData();
  }, [props, instructorID]);

  if (user) {
    return (
      <Fragment>
        <NavbarMenu></NavbarMenu>
        <StudentListCourseApproval courses={user.courses}></StudentListCourseApproval>
      </Fragment>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default CourseApprovalPage;
