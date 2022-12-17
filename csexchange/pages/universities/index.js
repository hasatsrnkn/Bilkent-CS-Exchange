import NavbarMenu from "../../components/UI/NavbarMenu";
import Universities from "../../components/Universities/Universities";
import { Col, Row } from "react-bootstrap";
import UniversitiesFilter from "../../components/Universities/UniversitiesFilter";
import { useState } from "react";
import PointCalculator from "../../components/Universities/PointCalculator";
import { API_UNIS_INFO_ENDPOINT } from "../api/api";
import { loadingActions } from "../../store/loading";
import { useDispatch } from "react-redux";

const UniversitiesPage = (props) => {
  const [filteredUniDepartment, setFilteredUniDepartment] = useState("cs");
  const [studentPoint, setStudentPoint] = useState(0);
  const dispatch = useDispatch();
  dispatch(loadingActions.setIsNotLoading());

  const filterChangeHandler = (selectedUnis) => {
    setFilteredUniDepartment(selectedUnis);
  };

  const pointChangeHandler = (thePoint) => {
    setStudentPoint(thePoint);
  };

  const filteredUnis = props.universities.filter((anUni) => {
    return anUni.department.toLowerCase() == filteredUniDepartment;
  });

  return (
    <div>
      <NavbarMenu></NavbarMenu>
      <Row className="ms-3">
        <Col>
          <UniversitiesFilter
            selected={filteredUniDepartment}
            onChangeFilter={filterChangeHandler}
          ></UniversitiesFilter>
        </Col>
        <Col>
          <PointCalculator onChangePoint={pointChangeHandler}></PointCalculator>
        </Col>
      </Row>

      <Universities
        universities={filteredUnis}
        theStudentPoint={studentPoint}
      ></Universities>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch(API_UNIS_INFO_ENDPOINT);
  const data = await res.json();
  

  /* python manage.py runserver */
  return {
    props: {
      universities: data.map((uni) => ({
        id: uni.university.id,
        name: uni.university.name,
        location: uni.university.location,
        webSiteLink: uni.university.website_link,
        taughtInEnglishInfo: uni.taught_in_english_info,
        languageRequirements: uni.language_requirements,
        description: uni.university.description,
        rating: uni.university.rating,
        department: uni.department,
        threshold: uni.threshold,
        quota: uni.quota,
        coordinator: {
          name: uni.coordinator.first_name,
          surname: uni.coordinator.last_name,
        },
      })),
    },
    revalidate: 1,
  };
}

export default UniversitiesPage;
