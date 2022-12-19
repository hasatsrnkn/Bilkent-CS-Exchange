import { Alert, Button } from "react-bootstrap";
const StudentCourseApproval = (props) => {
  return (
    <tr>
      <td></td>
      <td>{props.name}</td>
      <td>{props.courseName}</td>
      <td>{props.yourCourse}</td>
      <td>
        <Button variant="success me-5">Approve</Button>
        <Button className="ms-5" variant="danger">
          Disapprove
        </Button>
      </td>
      <td>
        {props.approved && <Alert variant="success">Approved</Alert>}
        {!props.approved && <Alert variant="danger">Disapproved</Alert>}
      </td>
    </tr>
  );
};

export default StudentCourseApproval;
