import { Form, Row, Col, Container, Card, Button } from "react-bootstrap";


const Student = (props) => {
  return (
    <tr>
      <td></td>
      <td>{props.name}</td>
      <td>{props.ID}</td>
      <td>{props.newOrEditedFiles ? props.newOrEditedFiles : "0"}</td>
    
      <td>
        <Button>View Profile</Button>
      </td>
    </tr>
  );
};

export default Student;
