import { Form, Row, Col, Container, Card, Button } from "react-bootstrap";
import { useEffect, useState, useReducer } from "react"
import defaultProfilePhoto from "./default.png"

const Student = (props) => {

    return (
        <tr>
            <td><img src={defaultProfilePhoto}></img></td>
            <td>{props.name}</td>
            <td>{props.ID}</td>
            <td>
                {props.newOrEditedFiles ? "+" + props.newOrEditedFiles : ""}
            </td>
            <td><Button>View Files</Button>      <Button>View Profile</Button></td>
        </tr>
    );
}

export default Student;