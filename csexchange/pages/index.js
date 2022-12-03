import { Button, Image, Col, Container, Row, Figure } from "react-bootstrap";
import ContinueAsGuest from "../components/mainMenuPage/ContinueAsGuest";
import LastDate from "../components/mainMenuPage/LastDate";
import MainPageForm from "../components/mainMenuPage/MainPageForm";

const HomePage = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center mt-5">
      <Row>
        <Col className="pt-5 me-4">
          <Row>
            <Figure>
              <Figure.Image
                width={300}
                src="https://upload.wikimedia.org/wikipedia/tr/e/ee/Bilkent%C3%9Cniversitesi-logo.png"
              ></Figure.Image>
            </Figure>
          </Row>
          <Row>
            <LastDate></LastDate>
          </Row>
        </Col>
        <Col className="p-5 ms-4">
          <Row>
            <h1 className="text-primary">Welcome To Erasmus Page</h1>
          </Row>
          <Row className="mt-3">
            <MainPageForm></MainPageForm>
          </Row>
          <Row className="mt-3 ms-5">
            <ContinueAsGuest></ContinueAsGuest>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
