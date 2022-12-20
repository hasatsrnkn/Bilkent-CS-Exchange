import { Fragment } from "react";
import { Form, Container, Row, Card, Col } from "react-bootstrap";
import PreApprovalForm from "../../../components/Files/PreApproval/PreApprovalForm";
import NavbarMenu from "../../../components/UI/NavbarMenu";
import { useSelector } from "react-redux";
const PreApprovalPage = (props) => {
  const isAuth = useSelector((state) => state.auth.token);

  if (isAuth) {
    return (
      <Row>
        <NavbarMenu></NavbarMenu>
        <PreApprovalForm></PreApprovalForm>
      </Row>
    );
  }
  else {
    return(<Row>
      <NavbarMenu></NavbarMenu>
      <h1 className="ms-3 mt-3">NOT AUTHORIZED</h1>
    </Row>);
  }
};

export default PreApprovalPage;
