import NavbarMenu from "../../components/UI/NavbarMenu";
import Universities from "../../components/Universities/Universities";
import { Col, Row } from "react-bootstrap";
import UniversitiesFilter from "../../components/Universities/UniversitiesFilter";
import { useState } from "react";
import PointCalculator from "../../components/Universities/PointCalculator";

const uni = [
  {
    name: "Bilkent Uni",
    description:
      "Bilkent Üniversitesi ya da resmî adıyla İhsan Doğramacı Bilkent Üniversitesi, Türkiye'nin başkenti Ankara'da yer alan vakıf üniversitesi. İhsan Doğramacı tarafından, İhsan Doğramacı Eğitim Vakfı, İhsan Doğramacı Sağlık Vakfı ve İhsan Doğramacı Bilim ve Araştırma Vakfı kararlarıyla 20 Ekim 1984'te, Türkiye'nin ilk vakıf üniversitesi olarak kurulmuştur.[11] Bilkent Üniversitesi, kuruluş amacını eğitim kalitesi, bilimsel araştırma ve yayınları ile kültür ve sanat faaliyetleri açısından dünyanın önde gelen üniversiteleri arasında yer almak olarak açıklamıştır.[1] Bu amaç doğrultusunda üniversiteye Bilim Kentinin kısaltılmışı olan Bilkent adı verilmiştir",
    rating: 2.4,
    department: "cs",
    averagePoint: 80
  },
  {
    name: "Anan Uni",
    description:
      "Bilkent Üniversitesi ya da resmî adıyla İhsan Doğramacı Bilkent Üniversitesi, Türkiye'nin başkenti Ankara'da yer alan vakıf üniversitesi. İhsan Doğramacı tarafından, İhsan Doğramacı Eğitim Vakfı, İhsan Doğramacı Sağlık Vakfı ve İhsan Doğramacı Bilim ve Araştırma Vakfı kararlarıyla 20 Ekim 1984'te, Türkiye'nin ilk vakıf üniversitesi olarak kurulmuştur.[11] Bilkent Üniversitesi, kuruluş amacını eğitim kalitesi, bilimsel araştırma ve yayınları ile kültür ve sanat faaliyetleri açısından dünyanın önde gelen üniversiteleri arasında yer almak olarak açıklamıştır.[1] Bu amaç doğrultusunda üniversiteye Bilim Kentinin kısaltılmışı olan Bilkent adı verilmiştir",
    rating: 5,
    department: "cs",
    averagePoint: 50
  },
  {
    name: "baba Uni",
    description:
      "Bilkent Üniversitesi ya da resmî adıyla İhsan Doğramacı Bilkent Üniversitesi, Türkiye'nin başkenti Ankara'da yer alan vakıf üniversitesi. İhsan Doğramacı tarafından, İhsan Doğramacı Eğitim Vakfı, İhsan Doğramacı Sağlık Vakfı ve İhsan Doğramacı Bilim ve Araştırma Vakfı kararlarıyla 20 Ekim 1984'te, Türkiye'nin ilk vakıf üniversitesi olarak kurulmuştur.[11] Bilkent Üniversitesi, kuruluş amacını eğitim kalitesi, bilimsel araştırma ve yayınları ile kültür ve sanat faaliyetleri açısından dünyanın önde gelen üniversiteleri arasında yer almak olarak açıklamıştır.[1] Bu amaç doğrultusunda üniversiteye Bilim Kentinin kısaltılmışı olan Bilkent adı verilmiştir",
    rating: 5,
    department: "ee",
    averagePoint: 60
  },
  {
    name: "cartcurt Uni",
    description:
      "Bilkent Üniversitesi ya da resmî adıyla İhsan Doğramacı Bilkent Üniversitesi, Türkiye'nin başkenti Ankara'da yer alan vakıf üniversitesi. İhsan Doğramacı tarafından, İhsan Doğramacı Eğitim Vakfı, İhsan Doğramacı Sağlık Vakfı ve İhsan Doğramacı Bilim ve Araştırma Vakfı kararlarıyla 20 Ekim 1984'te, Türkiye'nin ilk vakıf üniversitesi olarak kurulmuştur.[11] Bilkent Üniversitesi, kuruluş amacını eğitim kalitesi, bilimsel araştırma ve yayınları ile kültür ve sanat faaliyetleri açısından dünyanın önde gelen üniversiteleri arasında yer almak olarak açıklamıştır.[1] Bu amaç doğrultusunda üniversiteye Bilim Kentinin kısaltılmışı olan Bilkent adı verilmiştir",
    rating: 5,
    department: "me",
    averagePoint: 50
  },
];

const UniversitiesPage = (props) => {
  const [filteredUniDepartment, setFilteredUniDepartment] = useState("cs");
  const [studentPoint, setStudentPoint] = useState(0);

  const filterChangeHandler = (selectedUnis) => {
    setFilteredUniDepartment(selectedUnis);
  };

  const pointChangeHandler = (thePoint) => {
    setStudentPoint(thePoint);
  };

  const filteredUnis = uni.filter((anUni) => {
    return anUni.department == filteredUniDepartment;
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
/*
export async function getStaticProps() {
  const res = await fetch("http://127.0.0.1:8000/api/all-unis/");
  const data = await res.json();
  /* python manage.py runserver 
  return {
    props: {
      universities: data.map((uni) => ({
        name: uni.name,
        description: uni.description,
        rating: uni.rating,
        department: uni.department,
      })),
    },
    revalidate: 1,
  };
}
*/
export default UniversitiesPage;
