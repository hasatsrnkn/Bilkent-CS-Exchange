import { Row, Col, Button } from "react-bootstrap";

const DownloadFiles = (props) => {
  return (
    <Row>
      <Col className="p-5">
        <Row>
          <h2 className="mb-3 text-danger d-flex justify-content-center align-items-center">
            DOWNLOAD
          </h2>
          <Col className="col-6 p-4">
            <Row className="mt-5">
              <Button size="lg" variant="secondary">Download Acceptance Letter</Button>
            </Row>
            <Row className="mt-5">
              <Button size="lg" variant="secondary">Download Health and Travel Insurances</Button>
            </Row>
            <Row className="mt-5">
              <Button size="lg" variant="secondary">Download Erasmus Grant Agreement</Button>
            </Row>
          </Col>
          <Col className="col-6 p-4">
            <Row className="mt-5">
              <Button size="lg" variant="secondary">Download Learning Agreement</Button>
            </Row>
            <Row className="mt-5">
              <Button size="lg" variant="secondary">Download Pre-Approval</Button>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default DownloadFiles;
