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
import Student from "./Student";

const StudentList = (props) => {
  const [students, setStudents] = useState([
    {
      profilePhoto: "",
      name: "Kaan Burak",
      ID: "219000",
      newOrEditedFiles: 3,
      fileLink: "",
      profileLink: "",
    },
    {
      profilePhoto: "",
      name: "Ali Ahmet",
      ID: "222400",
      newOrEditedFiles: 0,
      fileLink: "",
      profileLink: "",
    },
    {
      profilePhoto: "",
      name: "Mustafa Ak",
      ID: "23000",
      newOrEditedFiles: 0,
      fileLink: "",
      profileLink: "",
    },
    {
      profilePhoto: "",
      name: "Eren Ali",
      ID: "219000",
      newOrEditedFiles: 2,
      fileLink: "",
      profileLink: "",
    },
    {
      profilePhoto: "",
      name: "Eren Dur",
      ID: "219000",
      newOrEditedFiles: 0,
      fileLink: "",
      profileLink: "",
    },
    {
      profilePhoto: "",
      name: "Hasan Ali",
      ID: "219000",
      newOrEditedFiles: 0,
      fileLink: "",
      profileLink: "",
    },
    {
      profilePhoto: "",
      name: "Ege Can",
      ID: "219000",
      newOrEditedFiles: 0,
      fileLink: "",
      profileLink: "",
    },
    {
      profilePhoto: "",
      name: "Ayşe Su",
      ID: "219000",
      newOrEditedFiles: 1,
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
          <th>New or Edited Files</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {students.map((student) => {
          return (
            <Student
              key={student.ID}
              {...student}
            ></Student>
          );
        })}
      </tbody>
    </Table>
  );
};

export default StudentList;
