import { Tab, Table } from "react-bootstrap";
import StudentCourseApproval from "./StudentCourseApproval";
const StudentListCourseApproval = (props) => {
  
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th></th>
          <th>University Name</th>
          <th>Course Name</th>
          <th>Your Course</th>
          <th>Approve</th>
          <th>Approve Situation</th>
        </tr>
      </thead>
      <tbody>
        {props.courses.map((course) => {
          return (
            <StudentCourseApproval
              key={course.id}
              id={course.id}
              uniName={course.uniName}
              courseName={course.courseName}
              courseCode= {course.courseCode}
              bilkentCourseName={course.bilkentCourseName}
              approved={course.approved}
            ></StudentCourseApproval>
          );
        })}
      </tbody>
    </Table>
  );
};

export default StudentListCourseApproval;
