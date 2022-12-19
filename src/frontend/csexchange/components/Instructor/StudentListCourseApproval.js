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
        {props.students.map((student) => {
          return (
            <StudentCourseApproval
              key={student.id}
              id = {student.id}
              name = {student.name}
              courseName={student.courseName}
              yourCourse={student.yourCourse}
              approved={student.approved}
            ></StudentCourseApproval>
          );
        })}
      </tbody>
    </Table>
  );
};

export default StudentListCourseApproval;
