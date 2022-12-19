import { Spinner, Col, Container, Row, Figure } from "react-bootstrap";
import ContinueAsGuest from "../components/mainMenuPage/ContinueAsGuest";
import LastDate from "../components/mainMenuPage/LastDate";
import MainPageForm from "../components/mainMenuPage/MainPageForm";
import { useSelector } from "react-redux";
import bg from "../assets/bilkent_background.jpg";
import bilkentLogo from "../assets/bilkentlogo.png";

const HomePage = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);

  return (
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
        width: "100vw",
        height: "100vh",
      }}
    >
      <Container className="pt-5">
        <Row className="pt-5 mt-5">
          <Container className="d-flex align-items-center justify-content-center mt-5">
            <Row>
              <Col className="pt-5 me-5">
                <Row className="ps-5">
                  <Figure>
                    <Figure.Image
                      width={300}
                      src={bilkentLogo.src}
                    ></Figure.Image>
                  </Figure>
                </Row>
                <Row>
                  <LastDate></LastDate>
                </Row>
              </Col>
              <Col
                className="p-3"
                style={{
                  backgroundColor: "white",
                  borderRadius: "5%",
                }}
              >
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
              variant="light"
              style={{
                width: 100,
                height: 100,
              }}
            />
          )}
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
