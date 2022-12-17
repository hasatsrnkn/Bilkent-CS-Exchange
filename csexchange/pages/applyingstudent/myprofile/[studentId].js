import PersonalInfo from "../../../components/Profile/PersonalInfo";
import NavbarMenu from "../../../components/UI/NavbarMenu";
import { Col, Row } from "react-bootstrap";
import StudentInfo from "../../../components/Profile/Student/StudentInfo";
import ToDoList from "../../../components/Profile/ToDoList/ToDoList";
import { loadingActions } from "../../../store/loading";
import {
  API_ALL_APPLYING_STUDENTS_ENDPOINT,
  API_MYPROFILE_STUDENT_ENDPOINT,
} from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const student = {
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
};

const studentProfilePage = (props) => {
  const token = useSelector((state) => state.auth.token);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();

  const { userID } = router.query;

  useEffect(() => {
    async function fetchData() {
      fetch(API_MYPROFILE_STUDENT_ENDPOINT, {
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
            university: {
              universityName: data.applied_university.name,
              universityWebLink: data.applied_university.website_link,
            },

            pictureLink: data.image,
            bilkentID: data.username,
            type: data.user_type,
            coordinator: {
              coordinatorName: data.stu_depc.first_name,
              coordinatorSurname: data.stu_depc.last_name,
              coordinatorID: data.stu_depc.id,
            },
            departmentSecretary: {
              secretaryName: data.stu_excc.first_name,
              secretarySurname: data.stu_excc.last_name,
              secretaryID: data.stu_excc.id,
            },
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
      <Row>
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
            <StudentInfo
              universityName={user.university.universityName}
              universityWebLink={user.university.universityWebLink}
              coordinatorName={user.coordinator.coordinatorName}
              coordinatorSurname = {user.coordinator.coordinatorSurname}
              coordinatorID = {user.coordinator.coordinatorID}
              departmentSecretaryName={user.departmentSecretary.secretaryName}
              departmentSecretarySurname = {user.departmentSecretary.secretarySurname}
              departmentSecretaryID = {user.departmentSecretary.secretaryID}

            ></StudentInfo>
          </Col>
          <Col className="col-3">
            <Row>
              <Col className="d-flex justify-content-center">
                <h2>To-Do List</h2>
              </Col>
            </Row>
            <hr></hr>
            <Row>
              <ToDoList toDoList={student.toDoList}></ToDoList>
            </Row>
          </Col>
        </Row>
      </Row>
    );
  } else {
    <p>Loading...</p>;
  }
};

export async function getStaticPaths() {
  const res = await fetch(API_ALL_APPLYING_STUDENTS_ENDPOINT);
  const data = await res.json();

  return {
    fallback: false,
    paths: data.map((student) => ({
      params: { studentId: student.id.toString() },
    })),
  };
}

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default studentProfilePage;
