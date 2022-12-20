import { Fragment,useEffect,useState } from "react";
import StudentList from "../../../components/DepartmentCoordinator/StudentList";
import NavbarMenu from "../../../components/UI/NavbarMenu";
import { Row } from "react-bootstrap";
import { API_BASE_URL, API_STUDENT_LIST_ENDPOINT } from "../../api/api";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const StudentListPage = (props) => {
  const token = useSelector((state) => state.auth.token);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { userID } = router.query;

  useEffect(() => {
    async function fetchData() {
      fetch(API_STUDENT_LIST_ENDPOINT, {
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
            students: data.map((student) => ({
              name: student.first_name,
              surname: student.last_name,
              id: student.id,
              bilkentId: student.username,
              newOrEditedFiles: student.newOrEditedFiles,
            })),
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
        <Row className="mt-4">
          <StudentList students={user.students}></StudentList>
        </Row>
      </Fragment>
    );
  } else {
    <p>Loading...</p>;
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

export default StudentListPage;
