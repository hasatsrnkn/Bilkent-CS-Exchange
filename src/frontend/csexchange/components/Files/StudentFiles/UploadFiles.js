import { useRef, useState } from "react";
import { Col, Form, Row, Button, Modal } from "react-bootstrap";
import { API_FILES_ENDPOINT } from "../../../pages/api/api";
import { useSelector } from "react-redux";
import axios from "axios";

const UploadFiles = (props) => {
  const [acceptanceLetter, setAcceptanceLetter] = useState(null);
  const [healthAndTravel, setHealthAndTravel] = useState(null);
  const [erasmusGrantAgreement, setErasmusGrantAgreement] = useState(null);
  const [learningAgreement, setLearningAgreement] = useState(null);
  const [show, setShow] = useState(false);
  const formRef = useRef(null);
  const token = useSelector((state) => state.auth.token);

  const handleClose = () => {
    setShow(false);
  };

  const acceptanceLetterHandler = (event) => {
    event.preventDefault();
    setAcceptanceLetter(event.target.files[0]);
  };

  const healthAndTravelHandler = (event) => {
    event.preventDefault();
    setHealthAndTravel(event.target.files[0]);
  };
  const erasmusGrantAgreementHandler = (event) => {
    event.preventDefault();
    setErasmusGrantAgreement(event.target.files[0]);
  };
  const learningAgreementHandler = (event) => {
    event.preventDefault();
    setLearningAgreement(event.target.files[0]);
  };

  const submitHandler1 = async (event) => {
    event.preventDefault();
    if (acceptanceLetter != null) {
      const formData = new FormData();
      formData.append("file", acceptanceLetter);
      formData.append("file_name", "acceptance_letter");
      const body = formData;
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      };

      try {
        const res = await axios.post(API_FILES_ENDPOINT, body, config);
        setShow(true);
      } catch (err) {}
      formRef.current.reset();
    }
  };

  const submitHandler2 = async (event) => {
    event.preventDefault();
    if (healthAndTravel != null) {
      const formData = new FormData();
      formData.append("file", healthAndTravel);
      formData.append("file_name", "health_and_travel");
      const body = formData;
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      };

      try {
        const res = await axios.post(API_FILES_ENDPOINT, body, config);
        setShow(true);
      } catch (err) {}

      formRef.current.reset();
    }
  };

  const submitHandler3 = async (event) => {
    event.preventDefault();
    if (erasmusGrantAgreement != null) {
      const formData = new FormData();
      formData.append("file", erasmusGrantAgreement);
      formData.append("file_name", "erasmus_grant_agreement");
      const body = formData;
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      };

      try {
        const res = await axios.post(API_FILES_ENDPOINT, body, config);
        setShow(true);
      } catch (err) {}

      formRef.current.reset();
    }
  };
  const submitHandler4 = async (event) => {
    event.preventDefault();

    if (learningAgreement != null) {
      const formData = new FormData();
      formData.append("file", learningAgreement);
      formData.append("file_name", "learning_agreement");
      const body = formData;
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      };

      try {
        const res = await axios.post(API_FILES_ENDPOINT, body, config);
        setShow(true);
      } catch (err) {}
      (err) => console.log(err.message);

      formRef.current.reset();
    }
  };

  return (
    <Row>
      <Col className="p-5">
        <h2 className="mb-3 text-dark d-flex justify-content-center align-items-center">
          UPLOAD
        </h2>
        <Form ref={formRef}>
          <Row>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Acceptance Letter</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf"
                onChange={acceptanceLetterHandler}
              />
            </Form.Group>
            <Button type="submit" onClick={submitHandler1}>
              Upload
            </Button>
          </Row>
          <Row>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Health and Travel Insurances</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf"
                onChange={healthAndTravelHandler}
              />
            </Form.Group>
            <Button type="submit" onClick={submitHandler2}>
              Upload
            </Button>
          </Row>
          <Row>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Erasmus Grant Agreement</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf"
                onChange={erasmusGrantAgreementHandler}
              />
            </Form.Group>
            <Button type="submit" onClick={submitHandler3}>
              Upload
            </Button>
          </Row>
          <Row>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Learning Agreement</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf"
                onChange={learningAgreementHandler}
              />
            </Form.Group>
            <Button type="submit" onClick={submitHandler4}>
              Upload
            </Button>
          </Row>
        </Form>
      </Col>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>
            <Row>You uploaded a file successfully!</Row>
          </h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};

export default UploadFiles;
