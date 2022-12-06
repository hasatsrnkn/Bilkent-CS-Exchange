import { ListGroup } from "react-bootstrap";
import Forum from "./Forum";

const ForumList = (props) => {
  return (
    <ListGroup>
      {props.forums.map((forum) => (
        <Forum
          name={forum.name}
          description={forum.description}
          solved={forum.solved}
          department={forum.department}
          replies={forum.replies}
          statedBy={forum.statedBy}
        ></Forum>
      ))}
    </ListGroup>
  );
};

export default ForumList;
