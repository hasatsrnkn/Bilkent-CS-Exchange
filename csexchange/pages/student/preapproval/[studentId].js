import { Fragment } from "react";
import { Form, Container, Row, Card, Col } from "react-bootstrap";
import PreApprovalForm from "../../../components/Files/PreApproval/PreApprovalForm";
import NavbarMenu from "../../../components/UI/NavbarMenu";

const PreApprovalPage = (props) => {
  return (
    <Row>
      <NavbarMenu></NavbarMenu>
      <PreApprovalForm></PreApprovalForm>
    </Row>
  );
};

export default PreApprovalPage;
