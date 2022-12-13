import { Row, Col } from "react-bootstrap";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
const PointCalculator = (props) => {
  const [eng101No, setEng101No] = useState(26);
  const [eng102No, setEng102No] = useState(26);
  const [cgpaNo, setCgpaNo] = useState(2.5);
  const [number, setNumber] = useState(52);

  const eng101handler = (event) => {
    setEng101No(+event.target.value);
  };

  const eng102handler = (event) => {
    setEng102No(+event.target.value);
  };

  const cgpaHandler = (event) => {
    setCgpaNo(+event.target.value);
  };

  useEffect(() => {
    const thePoint = (eng101No + eng102No + (100 / 3) * (cgpaNo - 2.5));
    setNumber(thePoint.toFixed(2));
    props.onChangePoint(thePoint.toFixed(2));
  }, [eng101No, eng102No, cgpaNo]);

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
            <NativeSelect defaultValue="26" onChange={eng101handler}>
              <option value="26">A+</option>
              <option value="25">A</option>
              <option value="22">A-</option>
              <option value="19">B+</option>
              <option value="15">B</option>
              <option value="11">B-</option>
              <option value="6">C+</option>
              <option value="1">C</option>
              <option value="0">Other</option>
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
            <NativeSelect defaultValue="26" onChange={eng102handler}>
              <option value="26">A+</option>
              <option value="25">A</option>
              <option value="22">A-</option>
              <option value="19">B+</option>
              <option value="15">B</option>
              <option value="11">B-</option>
              <option value="6">C+</option>
              <option value="1">C</option>
              <option value="0">Other</option>
            </NativeSelect>
          </FormControl>
        </Box>
      </Col>
      <Col className="pt-2">
        <TextField
          type="number"
          label="Your CGPA"
          size="small"
          defaultValue={2.5}
          onChange={cgpaHandler}
          inputProps={{
            min: 2.5,
            max: 4.0,
            step: 0.01,
          }}
        ></TextField>
      </Col>
      <Col>
        <Row>
          <h5 className="text-info">Your Points</h5>
        </Row>
        <Row className="ps-3 text-info">{number}</Row>
      </Col>
    </Row>
  );
};

export default PointCalculator;
