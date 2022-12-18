import NavbarMenu from "../../../components/UI/NavbarMenu";
import { Col, Row } from "react-bootstrap";
import PersonalInfo from "../../../components/Profile/PersonalInfo";
import ToDoList from "../../../components/Profile/ToDoList/ToDoList";
import CoordinatorInfo from "../../../components/Profile/DepartmentCoordinator/CoordinatorInfo";
import { API_BASE_URL, API_MYPROFILE_ENDPOINT } from "../../api/api";
import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
const coordinator = {
  name: "Can",
  surname: "Alkan",
  id: "21212",
  picture: "picture",
  type: "Department Coordinator",
  email: "can.alkan@cs.bilkent.edu.tr",
  universityName: "Bilkent University",
  departmentSecretary: "Yelda Ateş",
  toDoList: [
    {
      name: "sdasda",
      done: true,
      deadline: "20.01.2020",
    },
    {
      name: "sdasda",
      done: false,
      deadline: "20.01.2020",
    },
  ],
  universities: [
    {
      name: "asdasd uni",
    },
    {
      name: "1aasad uni",
    },
    {
      name: "sadasd uni",
    },
    {
      name: "123123 uni",
    },
  ],
};

const CoordinatorProfilePage = (props) => {
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
            universities: data.assigned_unis.map( (uni) => ({
              name: uni.name,
            }))
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
          <Col className="col-7">
            <CoordinatorInfo
              universities={user.universities}
            ></CoordinatorInfo>
          </Col>
          <Col className="col-3">
            <Row>
              <Col className="d-flex justify-content-center">
                <h2>To-Do List</h2>
              </Col>
            </Row>
            <hr></hr>
            <Row>
              <ToDoList toDoList={coordinator.toDoList}></ToDoList>
            </Row>
          </Col>
        </Row>
      </Fragment>
    );
  }
  else {
    return( <p>Loading...</p>)
  }
};

//AYARLANACAK
export async function getStaticPaths() {
  const res = await fetch(API_BASE_URL + "all-department-coordinators/");
  const data = await res.json();

  return {
    fallback: false,
    paths: data.map((coordinator) => ({
      params: { coordinatorId: coordinator.id.toString() },
    })),
  };
}

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default CoordinatorProfilePage;
