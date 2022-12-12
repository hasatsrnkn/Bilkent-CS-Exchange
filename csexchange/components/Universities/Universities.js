import { ListGroup } from "react-bootstrap";
import University from "./University";

const Universities = (props) => {
  return (
    <ListGroup>
      {props.universities.map((university) => (
        <University
          name={university.name}
          description={university.description}
          rating={university.rating}
          department={university.department}
          studentPoint={props.theStudentPoint}
          averagePoint={university.averagePoint}
        ></University>
      ))}
    </ListGroup>
  );
};

export default Universities;
