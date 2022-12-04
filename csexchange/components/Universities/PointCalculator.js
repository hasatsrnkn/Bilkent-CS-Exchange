import { Row, Col } from "react-bootstrap";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

const PointCalculator = (props) => {
  return (
    <Row>
      <Col>
        <h5 className="text-info">Calculate Your Point</h5>
      </Col>
      <Col>
        <Box sx={{ width: 100 }}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              ENG101
            </InputLabel>
            <NativeSelect defaultValue={"a+"}>
              <option value={"a+"}>A+</option>
              <option value={"a"}>A</option>
              <option value={"a-"}>A-</option>
              <option value={"b+"}>B+</option>
              <option value={"b"}>B</option>
              <option value={"b-"}>B-</option>
              <option value={"c+"}>C+</option>
            </NativeSelect>
          </FormControl>
        </Box>
      </Col>
      <Col>
        <Box sx={{ width: 100 }}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              ENG102
            </InputLabel>
            <NativeSelect defaultValue={"a+"}>
              <option value={"a+"}>A+</option>
              <option value={"a"}>A</option>
              <option value={"a-"}>A-</option>
              <option value={"b+"}>B+</option>
              <option value={"b"}>B</option>
              <option value={"b-"}>B-</option>
              <option value={"c+"}>C+</option>
            </NativeSelect>
          </FormControl>
        </Box>
      </Col>
      <Col>
        <Row>
          <h5 className="text-info">Your Points</h5>
        </Row>
        <Row>output</Row>
      </Col>
    </Row>
  );
};

export default PointCalculator;
