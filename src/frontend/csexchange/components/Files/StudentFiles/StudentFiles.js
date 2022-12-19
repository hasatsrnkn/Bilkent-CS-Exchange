import { Row,Col } from "react-bootstrap";
import DownloadFiles from "./DownloadFiles";
import UploadFiles from "./UploadFiles";

const StudentFiles = () => {

    return( <Row>
        <Col className="col-6">
            <UploadFiles></UploadFiles>
        </Col>
        <Col className="col-6">
            <DownloadFiles></DownloadFiles>
        </Col>
    </Row>);
}

export default StudentFiles;