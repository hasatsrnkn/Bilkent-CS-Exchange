import { ListGroup } from "react-bootstrap";
import Forum from "./Forum";

const ForumList = (props) => {
  return (
    <ListGroup>
      {props.forums.map((forum) => (
        <Forum
        key={forum.id}
        id={forum.id}
        users = {forum.users}
        question= {forum.question}
        date= {forum.date}
        department= {forum.department}
        replies= {forum.replies}
        solved = {forum.solved}
        header = {forum.header}
        replyCount = {forum.replyCount}
        allReplies = {forum.allReplies}
        ></Forum>
      ))}
    </ListGroup>
  );
};

export default ForumList;
