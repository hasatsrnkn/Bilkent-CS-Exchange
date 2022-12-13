import { Spinner, Col, Container, Row, Figure } from "react-bootstrap";
import ContinueAsGuest from "../components/mainMenuPage/ContinueAsGuest";
import LastDate from "../components/mainMenuPage/LastDate";
import MainPageForm from "../components/mainMenuPage/MainPageForm";
import { useSelector } from "react-redux";

const HomePage = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);

  return (
    <Container>
      <Row>
        <Container className="d-flex align-items-center justify-content-center mt-5">
          <Row>
            <Col className="pt-5">
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
            <Col className="ps-5">
              <Row>
                <h1 className="text-primary">Welcome To Erasmus Page</h1>
              </Row>
              <Row className="mt-3">
                <MainPageForm></MainPageForm>
              </Row>
              <Row className="mt-3">
                <ContinueAsGuest></ContinueAsGuest>
              </Row>
            </Col>
          </Row>
        </Container>
      </Row>
      <Row className="d-flex align-items-center justify-content-center mt-5">
        {isLoading && (
          <Spinner
            animation="border"
            variant="primary"
            className="m-5"
            style={{
              width: 200,
              height: 200,
            }}
          />
        )}
      </Row>
    </Container>
  );
};

export default HomePage;
