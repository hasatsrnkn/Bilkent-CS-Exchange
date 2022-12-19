import { Form, Row, Col, Container, Card, Button } from "react-bootstrap";

const StudentApprove = (props) => {
  return (
    <tr>
      <td></td>
      <td>{props.name}</td>
      <td>{props.ID}</td>
      <td>{props.studentPoint}</td>
      <td>{props.university}</td>

      <td>
        <Button variant="success" className="me-5">Approve Student</Button>
        <Button variant="danger" className="ms-5">Delete Student</Button>
      </td>
    </tr>
  );
};

export default StudentApprove;
