import { Row  } from "react-bootstrap";
import StudentFiles from "../../../components/Files/StudentFiles/StudentFiles";
import NavbarMenu from "../../../components/UI/NavbarMenu";

const FilesPage = (props) => {
  return (
    <Row>
      <NavbarMenu></NavbarMenu>
      <StudentFiles></StudentFiles>
    </Row>
  );
};

export default FilesPage;
