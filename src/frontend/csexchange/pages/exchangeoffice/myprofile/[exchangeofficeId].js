import { Fragment, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import NavbarMenu from "../../../components/UI/NavbarMenu";
import axios from "axios";
import { API_EXCEL_ENDPOINT } from "../../api/api";
import { useSelector } from "react-redux";
import { useRef } from "react";

const ExchangeOfficePage = (props) => {
  const [file, setFile] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const formRef=useRef();

  const excelFileHandler = (event) => {
    event.preventDefault();
    setFile(event.target.files[0]);
  };


  const submitHandler = async (event) => {
    event.preventDefault();
    if (file != null) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("file_name", file.name);
      const body = formData;
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      };

      try {
        const res = await axios.post(API_EXCEL_ENDPOINT, body, config);
      } catch (err) {}
      formRef.current.reset();
    }
  };


  return (
    <Fragment>
      <NavbarMenu></NavbarMenu>
      <Container className="d-flex mt-5 pt-5 justify-content-center align-items-center">
        <Form ref={formRef}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Excel File</Form.Label>
          <Form.Control
            type="file"
            accept=".xlsx"
            onChange={excelFileHandler}
          />
        </Form.Group>
        </Form>
        <Button className="mt-3 ms-4" type="submit" onClick={submitHandler}>
          Upload
        </Button>
      </Container>
    </Fragment>
  );
};

export default ExchangeOfficePage;
