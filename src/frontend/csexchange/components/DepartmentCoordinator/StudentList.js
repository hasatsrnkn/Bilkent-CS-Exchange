import {
  Form,
  Row,
  Col,
  Container,
  Card,
  Button,
  Table,
} from "react-bootstrap";
import Student from "./Student";

const StudentList = (props) => {

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th></th>
          <th>Student Name</th>
          <th>ID</th>
          <th>New or Edited Files</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {props.students.map((student) => {
          return (
            <Student
              key={student.id}
              {...student}
            ></Student>
          );
        })}
      </tbody>
    </Table>
  );
};

export default StudentList;
