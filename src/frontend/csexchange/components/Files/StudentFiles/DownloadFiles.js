import { Row, Col, Button } from "react-bootstrap";
import { API_BASE_URL, API_DOWNLOAD_FILES_ENDPOINT } from "../../../pages/api/api";
import { useSelector } from "react-redux";
const DownloadFiles = (props) => {
  const token = useSelector((state) => state.auth.token);

  const downloadHandler = (event, file_name) => {
    event.preventDefault();
    const url = !props.studentId
      ? API_DOWNLOAD_FILES_ENDPOINT + file_name + "/"
      : API_BASE_URL + "download-file-other/" + file_name + "/" + props.studentId + "/";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/pdf",
        Authorization: `Token ${token}`,
      },
    }).then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        console.log(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = `${file_name}.pdf`;
        alink.click();
      });
    });
  };

  return (
    <Row>
      <Col className="p-5">
        <Row>
          <h2 className="mb-3 text-dark d-flex justify-content-center align-items-center">
            DOWNLOAD
          </h2>
          <Col className="col-6 p-4">
            <Row className="mt-5">
              <Button
                size="lg"
                variant="secondary"
                onClick={(e) => {
                  downloadHandler(e, "acceptance_letter");
                }}
              >
                Download Acceptance Letter
              </Button>
            </Row>
            <Row className="mt-5">
              <Button
                size="lg"
                variant="secondary"
                onClick={(e) => {
                  downloadHandler(e, "health_and_travel");
                }}
              >
                Download Health and Travel Insurances
              </Button>
            </Row>
            <Row className="mt-5">
              <Button
                size="lg"
                variant="secondary"
                onClick={(e) => {
                  downloadHandler(e, "erasmus_grant_agreement");
                }}
              >
                Download Erasmus Grant Agreement
              </Button>
            </Row>
          </Col>
          <Col className="col-6 p-4">
            <Row className="mt-5">
              <Button
                size="lg"
                variant="secondary"
                onClick={(e) => {
                  downloadHandler(e, "learning_agreement");
                }}
              >
                Download Learning Agreement
              </Button>
            </Row>
            <Row className="mt-5">
              <Button
                size="lg"
                variant="secondary"
                onClick={(e) => {
                  downloadHandler(e, "pre_approval");
                }}
              >
                Download Pre-Approval
              </Button>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default DownloadFiles;
