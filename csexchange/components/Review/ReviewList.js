import { ListGroup } from "react-bootstrap";
import Review from "./Review";

const ReviewList = (props) => {
  return (
    <ListGroup variant="flush">
      {props.reviews.map((item) => (
        <Review
          user={item.user}
          description = {item.description}
          rating={item.rating}
        ></Review>
      ))}
    </ListGroup>
  );
};

export default ReviewList;
