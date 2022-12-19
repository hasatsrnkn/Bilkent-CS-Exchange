import {
  Form,
  Row,
  Col,
  Container,
  Card,
  Button,
  Table,
} from "react-bootstrap";
import { useEffect, useState, useReducer } from "react";
import StudentApprove from "./StudentApprove";

const StudentApproveList = (props) => {
  const [students, setStudents] = useState([
    {
      name: "Kaan Burak",
      ID: "219000",
      studentPoint: 90,
      university: "Esiee Paris",
      fileLink: "",
      profileLink: "",
    },
    {
      name: "Ali Ahmet",
      ID: "222400",
      studentPoint: 77,
      university: "Bamberg University",
      fileLink: "",
      profileLink: "",
    },
    {
      name: "Mustafa Ak",
      ID: "23000",
      studentPoint: 60,
      university: "Esiee Paris",
      fileLink: "",
      profileLink: "",
    },
    {
      name: "Eren Ali",
      ID: "219000",
      studentPoint: 50,
      university: "Esiee Paris",
      fileLink: "",
      profileLink: "",
    },
    {
      name: "Eren Dur",
      ID: "219000",
      studentPoint: 50,
      university: "Esiee Paris",
      fileLink: "",
      profileLink: "",
    },
    {
      name: "Hasan Ali",
      ID: "219000",
      studentPoint: 49,
      university: "Esiee Paris",
      fileLink: "",
      profileLink: "",
    },
    {
      name: "Ege Can",
      ID: "219000",
      studentPoint: 49,
      university: "Esiee Paris",
      fileLink: "",
      profileLink: "",
    },
    {
      name: "Ayşe Su",
      ID: "219000",
      studentPoint: 32,
      university: "Esiee Paris",
      fileLink: "",
      profileLink: "",
    },
  ]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th></th>
          <th>Student Name</th>
          <th>ID</th>
          <th>Student Point</th>
          <th>University</th>
          <th>Approve</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {students.map((student) => {
          return (
            <StudentApprove
              key={student.ID}
              name={student.name}
              id = {student.ID}
              university = {student.university}
              
              firstTime={props.firstTime}
              {...student}
            ></StudentApprove>
          );
        })}
      </tbody>
    </Table>
  );
};

export default StudentApproveList;
