import { Fragment, useState, useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
import NavbarMenu from "../../../components/UI/NavbarMenu";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import PersonalInfo from "../../../components/Profile/PersonalInfo";
import { API_MYPROFILE_ENDPOINT, API_BASE_URL } from "../../api/api";
import Link from "next/link";
import ToDoList from "../../../components/Profile/ToDoList/ToDoList";
const ExchangeCoordinatorPage = (props) => {
  const token = useSelector((state) => state.auth.token);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { userID } = router.query;

  useEffect(() => {
    async function fetchData() {
      fetch(API_MYPROFILE_ENDPOINT, {
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
            email: data.email,
            pictureLink: data.image,
            bilkentID: data.username,
            type: data.user_type,
            toDoList: data.check_list.items.map((item) => ({
              name: item.text,
              done: item.completed,
              deadline: item.deadline,
            })),
          });
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    fetchData();
  }, [props, userID]);

  const link = "/exchangecoordinator/studentlist/" + userID;
  if (user) {
    return (
      <Fragment>
        <NavbarMenu></NavbarMenu>
        <Row>
          <Col className="col-2">
            <PersonalInfo
              name={user.name}
              id={user.bilkentID}
              surname={user.surname}
              picture={user.pictureLink}
              type={user.type}
              email={user.email}
            ></PersonalInfo>
          </Col>
    
            <Col className="col-7 d-flex align-items-center justify-content-center">
              <Link href={link} passHref legacyBehavior>
                <Button variant="success" size="lg">
                  See Students List
                </Button>
              </Link>
            </Col>
         

          <Col className="col-3">
            <Row>
              <Col className="d-flex justify-content-center align-items-center">
                <h2>To-Do List</h2>
              </Col>
            </Row>
            <hr></hr>
            <Row>
              <ToDoList toDoList={user.toDoList}></ToDoList>
            </Row>
          </Col>
        </Row>
      </Fragment>
    );
  } else {
    <p>loading....</p>;
  }
};

export async function getStaticPaths() {
  const res = await fetch(API_BASE_URL + "all-exchange-coordinators/");
  const data = await res.json();

  return {
    fallback: false,
    paths: data.map((coordinator) => ({
      params: { userID: coordinator.id.toString() },
    })),
  };
}

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default ExchangeCoordinatorPage;
