import { ListGroup } from "react-bootstrap";
import Notification from "./Notification";
const NotificationList = (props) => {
  return (
    <ListGroup>
      {props.notifications.map((notification) => (
        <Notification
          id={notification.id}
          text={notification.text}
          date={notification.date}
        ></Notification>
      ))}
    </ListGroup>
  );
};

export default NotificationList;
