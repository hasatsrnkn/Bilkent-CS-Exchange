import { Row  } from "react-bootstrap";
import StudentFiles from "../../../components/Files/StudentFiles/StudentFiles";
import NavbarMenu from "../../../components/UI/NavbarMenu";
import { API_ALL_APPLYING_STUDENTS_ENDPOINT } from "../../api/api";
const FilesPage = (props) => {
  return (
    <Row>
      <NavbarMenu></NavbarMenu>
      <StudentFiles></StudentFiles>
    </Row>
  );
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

export default FilesPage;
