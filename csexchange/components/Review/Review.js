import { Fragment } from "react";

const Review = (props) => {
  return (
    <Fragment>
      <Row>
        <Col>{props.user}</Col>
        <Col>{props.description}</Col>
      </Row>
      <Row>
        <Col>{props.rating}</Col>
      </Row>
    </Fragment>
  );
};

export default Review;
