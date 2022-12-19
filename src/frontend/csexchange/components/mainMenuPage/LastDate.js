import { Alert, ProgressBar } from "react-bootstrap";

const LastDate = () => {
  let todayDate = new Date();
  let specificDate = new Date("2023-01-01");
  const diffTime = Math.abs(specificDate - todayDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return (
    <div>
      <Alert>
        <h3>Today's Date: {todayDate.toLocaleDateString()}</h3>
        <h3>Application Deadline: {specificDate.toLocaleDateString()}</h3>
        <hr></hr>
        <ProgressBar
          label={`${diffDays} days left`}
          variant="primary"
          now={Math.abs(100 - diffDays)}
        ></ProgressBar>
      </Alert>
    </div>
  );
};

export default LastDate;
