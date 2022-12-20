import { ListGroup } from "react-bootstrap";
import University from "./University";

const Universities = (props) => {
  return (
    <ListGroup>
      {props.universities.map((university) => (
        <University
          key = {university.id}
          id= {university.id}
          name= {university.name}
          location= {university.location}
          taughtInEnglishInfo = {university.taughtInEnglishInfo}
          webSiteLink = {university.webSiteLink}
          languageRequirements= {university.languageRequirements}
          description= {university.description}
          rating = {university.rating}
          studentPoint = {props.theStudentPoint}
          threshold = {university.threshold}
          department = {university.department}
          quota = {university.quota}
          coordinator = {university.coordinator}
          reviews= {university.reviews}
        ></University>
      ))}
    </ListGroup>
  );
};

export default Universities;
