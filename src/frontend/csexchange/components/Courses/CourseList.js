import Course from "./Course";
import { Table } from "react-bootstrap";
const CourseList = (props) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th></th>
          <th>Department</th>
          <th>University Name</th>
          <th>Course Name + Code</th>
          <th>Bilkent Course Name</th>
          <th>Approve Situation</th>
        </tr>
      </thead>
      <tbody>
        {props.courses.map((course) => {
          return (
            <Course
              department={course.department}
              uniName={course.uniName}
              courseName={course.courseName}
              courseCode={course.courseCode}
              bilkentCourseName={course.bilkentCourseName}
              approve={course.approve}
            ></Course>
          );
        })}
      </tbody>
    </Table>
  );
};

export default CourseList;
