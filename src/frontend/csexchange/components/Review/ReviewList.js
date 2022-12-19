import { ListGroup } from "react-bootstrap";
import Review from "./Review";

const ReviewList = (props) => {
  return (
    <ListGroup variant="flush">
      { props.reviews.map((item) => (
        <Review
          key={item.id}
          userName ={item.userName}
          userSurname = {item.userSurname}
          image = {item.image}
          text = {item.text}
          rating={item.rating}
        ></Review>
      )) }
    </ListGroup>
  );
};

export default ReviewList;
