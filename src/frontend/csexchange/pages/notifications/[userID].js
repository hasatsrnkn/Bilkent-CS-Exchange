import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import NotificationList from "../../components/Notifications/NotificationList";
import NavbarMenu from "../../components/UI/NavbarMenu";
import { API_ALL_USERS, API_NOTIFICATIONS_ENDPOINT } from "../api/api";
import { useSelector } from "react-redux";
const notifications = [
  {
    text: "asdadsaasdasddddddddddddddddddddddddddd",
    date: "adasdasdadssa",
  },
  {
    text: "asdadsaasd",
    date: "adasdasdadssa",
  },
  {
    text: "asdadsaasd",
    date: "adasdasdadssa",
  },
];

const NotificationsPage = (props) => {
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);
  const [user, setUser] = useState(null);

  const { userID } = router.query;
  useEffect(() => {
    async function fetchData() {
      fetch(API_NOTIFICATIONS_ENDPOINT, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed!";
              // if (data && data.error && data.error.message) {
              //   errorMessage = data.error.message;
              // }

              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          setUser({
            notifications: data
              ? data.map((notification) => ({
                  text: notification.text,
                  date: notification.receive_date,
                  id: notification.id,
                }))
              : null,
          });
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    fetchData();
  }, [props, userID]);
  if (user) {
    return (
      <Fragment>
        <NavbarMenu></NavbarMenu>
        {user.notifications && (<NotificationList notifications={user.notifications}></NotificationList>)}
        {Object.keys(user.notifications).length === 0 && <h2 className="ms-3">No Notifications</h2>}
        
      </Fragment>
    );
  } else {
    <p>Loading....</p>;
  }
};

export async function getStaticPaths() {
  const res = await fetch(API_ALL_USERS);
  const data = await res.json();

  return {
    fallback: false,
    paths: data.map((user) => ({
      params: { userID: user.id.toString() },
    })),
  };
}

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default NotificationsPage;
