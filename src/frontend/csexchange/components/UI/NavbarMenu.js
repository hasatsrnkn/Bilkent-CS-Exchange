import Link from "next/link";
import { Nav, Form, Button, Row } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { API_LOGOUT_ENDPOINT } from "../../pages/api/api";
import { authActions } from "../../store/auth";

const NavbarMenu = (props) => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const userID = useSelector((state) => state.auth.userID); /*değişcek*/
  const userType = useSelector((state) => state.auth.type);
  const token = useSelector((state) => state.auth.token);

  const logoutHandler = () => {
    fetch(API_LOGOUT_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    dispatch(authActions.logout());
  };

  return (
    <Navbar bg="primary" className="ps-2" variant="dark">
      <Navbar.Brand className="ms-2">Erasmus Bilkent</Navbar.Brand>
      <Nav className="me-auto">
        <Link href="/universities" passHref legacyBehavior>
          <Nav.Link className="ms-5">University Information</Nav.Link>
        </Link>
        <Link href="/forum" passHref legacyBehavior>
          <Nav.Link className="ms-5">Forum</Nav.Link>
        </Link>
        <Link href="/announcements" passHref legacyBehavior>
          <Nav.Link className="ms-5">Announcements</Nav.Link>
        </Link>
        {!isAuth && (
          <Link href="/" passHref legacyBehavior>
            <Nav.Link className="ms-5">Login</Nav.Link>
          </Link>
        )}
        {isAuth && (
          <Link
            href={`/${userType}/myprofile/${userID}`}
            passHref
            legacyBehavior
          >
            <Nav.Link className="ms-5">Profile</Nav.Link>
          </Link>
        )}
        {isAuth && (
          <Link href="/" passHref legacyBehavior>
            <Nav.Link className="ms-5" onClick={logoutHandler}>
              Log out
            </Nav.Link>
          </Link>
        )}
      </Nav>
      {isAuth && (
        <Form className="d-flex me-5">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="danger">Search</Button>
        </Form>
      )}
    </Navbar>
  );
};

export default NavbarMenu;
