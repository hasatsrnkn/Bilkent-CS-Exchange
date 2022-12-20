import { Button } from "react-bootstrap";
import Link from "next/link";

const Student = (props) => {
  const nameSurname = props.name + " " + props.surname;
  return (
    <tr>
      <td></td>
      <td>{nameSurname}</td>
      <td>{props.bilkentId}</td>
      <td>{props.newOrEditedFiles}</td>

      <td>
        <Link href={`/profile/student/${props.id}`} passHref legacyBehavior>
          <Button className="ms-4">View Profile</Button>
        </Link>
      </td>
    </tr>
  );
};

export default Student;
