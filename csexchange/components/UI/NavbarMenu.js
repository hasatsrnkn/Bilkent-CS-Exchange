import Link from "next/link";
import { Nav, Form, Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

const NavbarMenu = (props) => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <Navbar bg="primary" variant="dark">
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
          <Link href={`/student/profile/${user}`} passHref legacyBehavior>
          <Nav.Link className="ms-5">
            Profile
          </Nav.Link>
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
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="info">Search</Button>
      </Form>
    </Navbar>
  );
};

export default NavbarMenu;
