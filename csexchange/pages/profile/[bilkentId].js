import { Card, Container, Row } from "react-bootstrap";
import PersonalInfo from "../../components/Profile/PersonalInfo";
import NavbarMenu from "../../components/UI/NavbarMenu";
import { useRouter } from "next/router";

const ProfilePage = (props) => {
  const router = useRouter();
  const bilkentId = router.query.bilkentId;
  const student = {
    picture: "picture",
    name: "eray",
    surname: "surname",
    id: "0120",
    type: "instructor",
    email: "eray.tuzun@bilkent",
  };

  return (
    <div>
      <NavbarMenu></NavbarMenu>
      <Container>
        <Card className="align-items-center justify-content-center">
          <Row className="align-items-center justify-content-center">
           <h1>Picture: {student.picture} </h1>
          </Row>
          <Row className="align-items-center justify-content-center">
          <h1>Name: {student.name}</h1>
          </Row>
          <Row className="align-items-center justify-content-center">
            <h1>Surname: {student.surname}</h1>
          </Row>
          <Row className="align-items-center justify-content-center">
          <h1>Bilkent ID:{bilkentId}</h1>
          </Row>
          <Row className="align-items-center justify-content-center">
          <h1>Type: {student.type}</h1>
          </Row>
          <Row className="align-items-center justify-content-center">
          <h1>E-mail: {student.email}</h1>
          </Row>
        </Card>
      </Container>
    </div>
  );
};

export default ProfilePage;
