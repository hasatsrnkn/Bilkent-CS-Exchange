import {
  ListGroup,
  Row,
  Col,
  Alert,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useState, useEffect } from "react";

const ToDoListItem = (props) => {
  const [doneClass, setDoneClass] = useState();
  const renderTooltip = (page) => (
    <Tooltip id="button-tooltip" {...page}>
      {!props.done && <>Not Done!</>}
      {props.done && <>Done!</>}
    </Tooltip>
  );

  useEffect(() => {
    if (props.done) {
      setDoneClass("success");
    } else if (!props.done) {
      setDoneClass("danger");
    }
  }, [props.done]);

  return (
    <ListGroup.Item>
      <OverlayTrigger
        placement="left"
        delay={{ show: 250, hide: 100 }}
        overlay={renderTooltip}
      >
        <Row>
          <Alert variant={doneClass}>
            <Row>{props.name}</Row>
            <Row>Deadline: {props.deadline}</Row>
            
            </Alert>
        </Row>
      </OverlayTrigger>
    </ListGroup.Item>
  );
};

export default ToDoListItem;
