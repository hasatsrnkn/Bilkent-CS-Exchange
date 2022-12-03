import { Navbar } from "react-bootstrap";
import NavbarMenu from "../../components/UI/NavbarMenu";
import Universities from "../../components/Universities/Universities";

const uni = [
  {
    name: "Bilkent Uni",
    description:
      "Bilkent Üniversitesi ya da resmî adıyla İhsan Doğramacı Bilkent Üniversitesi, Türkiye'nin başkenti Ankara'da yer alan vakıf üniversitesi. İhsan Doğramacı tarafından, İhsan Doğramacı Eğitim Vakfı, İhsan Doğramacı Sağlık Vakfı ve İhsan Doğramacı Bilim ve Araştırma Vakfı kararlarıyla 20 Ekim 1984'te, Türkiye'nin ilk vakıf üniversitesi olarak kurulmuştur.[11] Bilkent Üniversitesi, kuruluş amacını eğitim kalitesi, bilimsel araştırma ve yayınları ile kültür ve sanat faaliyetleri açısından dünyanın önde gelen üniversiteleri arasında yer almak olarak açıklamıştır.[1] Bu amaç doğrultusunda üniversiteye Bilim Kentinin kısaltılmışı olan Bilkent adı verilmiştir",
      rating: "2.4"
    },
    {
      name: "asdasd Uni",
      description:
        "Bilkent Üniversitesi ya da resmî adıyla İhsan Doğramacı Bilkent Üniversitesi, Türkiye'nin başkenti Ankara'da yer alan vakıf üniversitesi. İhsan Doğramacı tarafından, İhsan Doğramacı Eğitim Vakfı, İhsan Doğramacı Sağlık Vakfı ve İhsan Doğramacı Bilim ve Araştırma Vakfı kararlarıyla 20 Ekim 1984'te, Türkiye'nin ilk vakıf üniversitesi olarak kurulmuştur.[11] Bilkent Üniversitesi, kuruluş amacını eğitim kalitesi, bilimsel araştırma ve yayınları ile kültür ve sanat faaliyetleri açısından dünyanın önde gelen üniversiteleri arasında yer almak olarak açıklamıştır.[1] Bu amaç doğrultusunda üniversiteye Bilim Kentinin kısaltılmışı olan Bilkent adı verilmiştir",
        rating: "2.6"
    }
];

const UniversitiesPage = () => {
  return (
    <div>
      <NavbarMenu></NavbarMenu>
      <Universities universities={uni}></Universities>
    </div>
  );
};

export default UniversitiesPage;
