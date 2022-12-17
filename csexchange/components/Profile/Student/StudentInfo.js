import { useState } from "react";
import { Button, Col, Row, Card, Modal } from "react-bootstrap";
import Link from "next/link";
import { useSelector } from "react-redux";

const StudentInfo = (props) => {
  const [show, setShow] = useState(false);
  const coordinatorFullName =
    props.coordinatorName + " " + props.coordinatorSurname;

  const departmentSecretaryFullName =
    props.departmentSecretaryName + " " + props.departmentSecretarySurname;
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  const userID = useSelector((state) => state.auth.userID);

  return (
    <Card className="p-2">
      <Col>
        <Row>
          <h1>INFO</h1>
        </Row>
        <Row className="mt-3 pb-5">
          <Col className="col-6">
            <h4>University: {props.universityName} </h4>
          </Col>
          <Col className="col-3">
            <Link href={props.universityWebLink} passHref legacyBehavior>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="link-item"
              >
                <Button>Go to University Page</Button>
              </a>
            </Link>
          </Col>
          <Col className="col-3">
            <Button variant="danger" onClick={handleShow}>
              Cancel Application
            </Button>
          </Col>
        </Row>
        <Row className="mt-5 pb-5">
          <Col className="col-6">
            <h4>Department Coordinator: {coordinatorFullName}</h4>
          </Col>
          <Col className="col-3">
            <Link
              href={`/profile/${props.coordinatorID}`}
              passHref
              legacyBehavior
            >
              <Button variant="secondary">Go to Coordinator Profile</Button>
            </Link>
          </Col>
          
        </Row>
        <Row className="mt-5 pb-5">
          <Col className="col-6">
            <h4>Exchange Coordinator: {departmentSecretaryFullName}</h4>
          </Col>
          <Col className="col-6">
            <Link
              href={`/profile/${props.departmentSecretaryID}`}
              passHref
              legacyBehavior
            >
              <Button variant="secondary">Go to Exchange Coordinator Profile</Button>
            </Link>
          </Col>
          
        </Row>
        <Row className="mt-5">
          <Col className="col-6 d-flex justify-content-center align-items-center">
            <Link href={`/student/preapproval/${userID}`} passHref legacyBehavior>
              <Button variant="success" size="lg">
                Fill Pre-Approval
              </Button>
            </Link>
          </Col>

          <Col className="col-6 d-flex justify-content-center align-items-center">
            <Link href={`/student/files/${userID}`} passHref legacyBehavior>
              <Button variant="success" size="lg">
                Go to Files
              </Button>
            </Link>
          </Col>
        </Row>
      </Col>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>
            You have to contact with your department coordinator to cancel your
            application!
          </h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default StudentInfo;
