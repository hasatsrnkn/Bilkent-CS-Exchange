import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

const UniversitiesFilter = (props) => {

    const dropdownChangeHandler = ( event ) => {
        props.onChangeFilter(event.target.value);
    }

  return (
    <Box sx={{ width: 100 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Department
        </InputLabel>
        <NativeSelect
          defaultValue={"cs"}
          value={props.selected}
          onChange={dropdownChangeHandler}
        >
          <option value={"cs"}>CS</option>
          <option value={"ee"}>EE</option>
          <option value={"me"}>ME</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
};

export default UniversitiesFilter;
