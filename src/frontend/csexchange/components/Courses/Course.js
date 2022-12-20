import { Alert } from "react-bootstrap";
const Course = (props) => {
  const nameCode = props.courseCode + " " + props.courseName;
  return (
    <tr>
      <td></td>
      <td>{props.department}</td>
      <td>{props.uniName}</td>
      <td>{nameCode}</td>
      <td>{props.bilkentCourseName}</td>
      <td>
        {props.approve && <Alert variant="success">Approved</Alert>}
        {!props.approve && <Alert variant="danger">Disapproved</Alert>}
      </td>
    </tr>
  );
};
export default Course;
