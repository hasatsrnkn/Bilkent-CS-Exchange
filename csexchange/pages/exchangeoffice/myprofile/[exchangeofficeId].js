import { Fragment } from "react";
import { Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import NavbarMenu from "../../../components/UI/NavbarMenu";
const ExchangeOfficePage = (props) => {
  return (
    <Fragment>
      <NavbarMenu></NavbarMenu>
      <Container className="d-flex mt-5 pt-5 justify-content-center align-items-center">
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Excel File</Form.Label>
          <Form.Control type="file" accept=".xlsx" />
        </Form.Group>
      </Container>
    </Fragment>
  );
};

export default ExchangeOfficePage;
