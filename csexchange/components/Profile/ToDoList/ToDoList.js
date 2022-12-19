import { ListGroup } from "react-bootstrap";
import ToDoListItem from "./ToDoListItem";

const ToDoList = (props) => {
  return (
    <ListGroup variant="flush">
      {props.toDoList
        ? props.toDoList.map((item) => (
            <ToDoListItem
              name={item.name}
              done={item.done}
              deadline={item.deadline}
            ></ToDoListItem>
          ))
        : null}
    </ListGroup>
  );
};

export default ToDoList;
