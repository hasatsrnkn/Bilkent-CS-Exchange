import { Fragment } from "react";
import { Container } from "react-bootstrap";
import ReviewList from "../../../components/Review/ReviewList";
import NavbarMenu from "../../../components/UI/NavbarMenu";
import {
  API_UNIS_INFO_ENDPOINT,
  API_UNI_REVIEWS_ENDPOINT,
} from "../../api/api";

const AllReviewsPage = (props) => {
  return (
    <Fragment>
      <NavbarMenu></NavbarMenu>
      <Container>
        {(Object.keys(props.reviews).length === 0) ? (
          <h2 className="mt-5 ms-5">THERE ARE NO REVIEWS FOR THIS UNIVERSITY YET</h2>
        ) : (
          <ReviewList reviews={props.reviews}></ReviewList>
        )}
      </Container>
    </Fragment>
  );
};

export async function getStaticPaths() {
  const res = await fetch(API_UNIS_INFO_ENDPOINT);
  const data = await res.json();

  return {
    fallback: false,
    paths: data.map((university) => ({
      params: { universityID: university.university.id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const res = await fetch(
    API_UNI_REVIEWS_ENDPOINT +context.params.universityID + "/reviews/"
  );
  const data = await res.json();
  return {
    props: {
      
      reviews: data
        ? data.map((review) => ({
            key: review.id,
            id: review.id,
            userName: review.reviewer.first_name,
            userSurname: review.reviewer.last_name,
            image: review.reviewer.image,
            rating: review.rating,
            text: review.text,
          }))
        : null,
    },
    revalidate: 1,
  };
}

export default AllReviewsPage;
