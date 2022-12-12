import { Row, Col } from "react-bootstrap";
import AnnouncementsList from "../../components/Announcements/AnnouncementsList";
import NavbarMenu from "../../components/UI/NavbarMenu";

const announs = [
  {
    statedBy: "Ali veli",
    description:
      "Bilkent Üniversitesi ya da resmî adıyla İhsan Doğramacı Bilkent Üniversitesi, Türkiye'nin başkenti Ankara'da yer alan vakıf üniversitesi. İhsan Doğramacı tarafından, İhsan Doğramacı Eğitim Vakfı, İhsan Doğramacı Sağlık Vakfı ve İhsan Doğramacı Bilim ve Araştırma Vakfı kararlarıyla 20 Ekim 1984'te, Türkiye'nin ilk vakıf üniversitesi olarak kurulmuştur.[11] Bilkent Üniversitesi, kuruluş amacını eğitim kalitesi, bilimsel araştırma ve yayınları ile kültür ve sanat faaliyetleri açısından dünyanın önde gelen üniversiteleri arasında yer almak olarak açıklamıştır.[1] Bu amaç doğrultusunda üniversiteye Bilim Kentinin kısaltılmışı olan Bilkent adı verilmiştir",
    date: "01.01.2023",
  },
  {
    statedBy: "Veli Ali",
    description:
      "Bilkent Üniversitesi ya da resmî adıyla İhsan Doğramacı Bilkent Üniversitesi, Türkiye'nin başkenti Ankara'da yer alan vakıf üniversitesi. İhsan Doğramacı tarafından, İhsan Doğramacı Eğitim Vakfı, İhsan Doğramacı Sağlık Vakfı ve İhsan Doğramacı Bilim ve Araştırma Vakfı kararlarıyla 20 Ekim 1984'te, Türkiye'nin ilk vakıf üniversitesi olarak kurulmuştur.[11] Bilkent Üniversitesi, kuruluş amacını eğitim kalitesi, bilimsel araştırma ve yayınları ile kültür ve sanat faaliyetleri açısından dünyanın önde gelen üniversiteleri arasında yer almak olarak açıklamıştır.[1] Bu amaç doğrultusunda üniversiteye Bilim Kentinin kısaltılmışı olan Bilkent adı verilmiştir",
    date: "01.01.2023",
  },
  {
    statedBy: "Ahmet veli",
    description:
      "Bilkent Üniversitesi ya da resmî adıyla İhsan Doğramacı Bilkent Üniversitesi, Türkiye'nin başkenti Ankara'da yer alan vakıf üniversitesi. İhsan Doğramacı tarafından, İhsan Doğramacı Eğitim Vakfı, İhsan Doğramacı Sağlık Vakfı ve İhsan Doğramacı Bilim ve Araştırma Vakfı kararlarıyla 20 Ekim 1984'te, Türkiye'nin ilk vakıf üniversitesi olarak kurulmuştur.[11] Bilkent Üniversitesi, kuruluş amacını eğitim kalitesi, bilimsel araştırma ve yayınları ile kültür ve sanat faaliyetleri açısından dünyanın önde gelen üniversiteleri arasında yer almak olarak açıklamıştır.[1] Bu amaç doğrultusunda üniversiteye Bilim Kentinin kısaltılmışı olan Bilkent adı verilmiştir",
    date: "01.01.2023",
  },
  {
    statedBy: "Ali ",
    description:
      "Bilkent Üniversitesi ya da resmî adıyla İhsan Doğramacı Bilkent Üniversitesi, Türkiye'nin başkenti Ankara'da yer alan vakıf üniversitesi. İhsan Doğramacı tarafından, İhsan Doğramacı Eğitim Vakfı, İhsan Doğramacı Sağlık Vakfı ve İhsan Doğramacı Bilim ve Araştırma Vakfı kararlarıyla 20 Ekim 1984'te, Türkiye'nin ilk vakıf üniversitesi olarak kurulmuştur.[11] Bilkent Üniversitesi, kuruluş amacını eğitim kalitesi, bilimsel araştırma ve yayınları ile kültür ve sanat faaliyetleri açısından dünyanın önde gelen üniversiteleri arasında yer almak olarak açıklamıştır.[1] Bu amaç doğrultusunda üniversiteye Bilim Kentinin kısaltılmışı olan Bilkent adı verilmiştir",
    date: "01.01.2023",
  },
];
const AnnouncementsPage = () => {
  return (
    <div>
      <NavbarMenu></NavbarMenu>
      <Row>
        <AnnouncementsList announcements={announs}></AnnouncementsList>
      </Row>
    </div>
  );
};

export default AnnouncementsPage;
