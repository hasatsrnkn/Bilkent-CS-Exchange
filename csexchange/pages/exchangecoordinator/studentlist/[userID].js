import { Fragment } from "react";
import StudentList from "../../../components/DepartmentCoordinator/StudentList";
import NavbarMenu from "../../../components/UI/NavbarMenu";
import { API_MYPROFILE_ENDPOINT, API_BASE_URL } from "../../api/api";

const StudentListPage = (props) => {

    return(<Fragment>
        <NavbarMenu></NavbarMenu>
        <StudentList></StudentList>
    </Fragment>);
}
export default StudentListPage;

export async function getStaticPaths() {
    const res = await fetch(API_BASE_URL + "all-exchange-coordinators/");
    const data = await res.json();
  
    return {
      fallback: false,
      paths: data.map((coordinator) => ({
        params: { userID: coordinator.id.toString() },
      })),
    };
  }
  
  export async function getStaticProps() {
    return {
      props: {},
    };
  }