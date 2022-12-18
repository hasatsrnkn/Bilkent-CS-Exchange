import { Col, Form, Row } from "react-bootstrap";

const UploadFiles = (props) => {
  return (
    <Row>
      <Col className="p-5">
        <h2 className="mb-3 text-danger d-flex justify-content-center align-items-center">UPLOAD</h2>
        <Form>
          <Row>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Euro Bank Account IBAN</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your euro bank account IBAN"
              ></Form.Control>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Acceptance Letter</Form.Label>
              <Form.Control type="file" accept=".pdf"/>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Health and Travel Insurances</Form.Label>
              <Form.Control type="file" accept=".pdf"/>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Erasmus Grant Agreement</Form.Label>
              <Form.Control type="file" accept=".pdf" />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Learning Agreement</Form.Label>
              <Form.Control type="file" accept=".pdf"/>
            </Form.Group>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default UploadFiles;
