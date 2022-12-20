import { Fragment } from "react";
import { Alert, Container, Row, Col } from "react-bootstrap";
import StudentFiles from "../../../components/Files/StudentFiles/StudentFiles";
import NavbarMenu from "../../../components/UI/NavbarMenu";
import { API_ALL_APPLYING_STUDENTS_ENDPOINT } from "../../api/api";
const FilesPage = (props) => {
  return (
    <Fragment>
      <NavbarMenu></NavbarMenu>
      <StudentFiles></StudentFiles>
      <Container>
        <Alert variant="danger" className="justify-content-center text-center">
          <Row>
            <b>Warning</b>
          </Row>
          The former file will be deleted when you upload a file!
        </Alert>
      </Container>
    </Fragment>
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
