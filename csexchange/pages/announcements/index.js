import { Row, Col } from "react-bootstrap";
import AnnouncementsList from "../../components/Announcements/AnnouncementsList";
import NavbarMenu from "../../components/UI/NavbarMenu";
import { API_ANNOUNCEMENTS_ENDPOINT } from "../api/api";

const AnnouncementsPage = (props) => {
  return (
    <div>
      <NavbarMenu></NavbarMenu>
      <Row>
        <AnnouncementsList announcements={props.announcements}></AnnouncementsList>
      </Row>
    </div>
  );
};



export async function getStaticProps() {
  const res = await fetch( API_ANNOUNCEMENTS_ENDPOINT );
  const data = await res.json();
  /* python manage.py runserver */
  return {
    props: {
      announcements: data.map((announcement) => ({
        announcer_name: announcement.announcer.name,
        announcer_surname: announcement.announcer.surname,
        context: announcement.context,
        text: announcement.text,
        date: announcement.date,
      })),
    },
    revalidate: 1,
  };
}
export default AnnouncementsPage;
