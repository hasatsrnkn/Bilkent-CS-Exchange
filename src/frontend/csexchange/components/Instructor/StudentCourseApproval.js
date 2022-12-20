import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { API_INSTRUCTOR_COURSES_ENDPOINT } from "../../pages/api/api";
import { useSelector } from "react-redux";
const StudentCourseApproval = (props) => {
  const nameCode = props.courseCode + " " + props.courseName;
  const [isDisabled, setIsDisabled] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const onClickHandler = (event, approved) => {
    event.preventDefault();
    setIsDisabled(true);
    
    const res = fetch(API_INSTRUCTOR_COURSES_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        id: props.id,
        approved_status: approved,
      }),
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <tr>
      <td></td>
      <td>{props.uniName}</td>
      <td>{nameCode}</td>
      <td>{props.bilkentCourseName}</td>
      <td>
        <Button
          variant="success me-5"
          disabled={isDisabled}
          onClick={(e) => onClickHandler(e, true)}
        >
          Approve
        </Button>
        <Button
          className="ms-5"
          disabled={isDisabled}
          variant="danger"
          onClick={(e) => onClickHandler(e, false)}
        >
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
