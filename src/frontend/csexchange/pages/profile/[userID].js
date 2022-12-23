import { Card, Container, Row, Figure } from "react-bootstrap";
import NavbarMenu from "../../components/UI/NavbarMenu";
import { useRouter } from "next/router";
import { Fragment, useState, useEffect } from "react";
import { API_ALL_USERS, API_PROFILE_ENDPOINT, BASE_URL } from "../api/api";
import { useSelector } from "react-redux";
import DownloadFiles from "../../components/Files/StudentFiles/DownloadFiles";

const ProfilePage = (props) => {
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);
  const [user, setUser] = useState(null);

  const { userID } = router.query;

  const url = API_PROFILE_ENDPOINT + userID + "/";
  useEffect(() => {
    async function fetchData() {
      fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed!";
              // if (data && data.error && data.error.message) {
              //   errorMessage = data.error.message;
              // }

              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          setUser({
            name: data.first_name,
            surname: data.last_name,
            picture: data.image,
            type: data.user_type,
            email: data.email,
            bilkentID: data.username,
          });
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    fetchData();
  }, [props, userID]);

  if (user) {
    return (
      <Fragment>
        <NavbarMenu></NavbarMenu>
        <Container>
          <Card className="align-items-center justify-content-center">
            <Row className="mt-3 align-items-center justify-content-center">
              <Figure>
                <Figure.Image
                  width={300}
                  src={BASE_URL + user.picture}
                ></Figure.Image>
              </Figure>
            </Row>
            <Row className="align-items-center justify-content-center">
              <h1>Name: {user.name}</h1>
            </Row>
            <Row className="align-items-center justify-content-center">
              <h1>Surname: {user.surname}</h1>
            </Row>
            <Row className="align-items-center justify-content-center">
              <h1>Bilkent ID: {user.bilkentID}</h1>
            </Row>
            <Row className="align-items-center justify-content-center">
              <h1>Title: {user.type}</h1>
            </Row>
            <Row className="align-items-center justify-content-center">
              <h1>E-mail: {user.email}</h1>
            </Row>
          </Card>
        </Container>
        
      </Fragment>
    );
  } else {
    return <p>YOU ARE NOT AUTHORIZED</p>;
  }
};

export async function getStaticPaths() {
  const res = await fetch(API_ALL_USERS);
  const data = await res.json();

  return {
    fallback: false,
    paths: data.map((user) => ({
      params: { userID: user.id.toString() },
    })),
  };
}

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default ProfilePage;
