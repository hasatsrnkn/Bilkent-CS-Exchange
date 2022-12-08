import NavbarMenu from "../../components/UI/NavbarMenu";
import { Col, Row } from "react-bootstrap";
import UniversitiesFilter from "../../components/Universities/UniversitiesFilter";
import { useState } from "react";
import ForumList from "../../components/ForumPage/ForumList";
import MostViewedList from "../../components/ForumPage/MostViewedList";
const fors = [
  {
    name: "Question 1",
    description:
      "Bilkent Üniversitesi ya da resmî adıyla İhsan Doğramacı Bilkent Üniversitesi, Türkiye'nin başkenti Ankara'da yer alan vakıf üniversitesi. İhsan Doğramacı tarafından, İhsan Doğramacı Eğitim Vakfı, İhsan Doğramacı Sağlık Vakfı ve İhsan Doğramacı Bilim ve Araştırma Vakfı kararlarıyla 20 Ekim 1984'te, Türkiye'nin ilk vakıf üniversitesi olarak kurulmuştur.[11] Bilkent Üniversitesi, kuruluş amacını eğitim kalitesi, bilimsel araştırma ve yayınları ile kültür ve sanat faaliyetleri açısından dünyanın önde gelen üniversiteleri arasında yer almak olarak açıklamıştır.[1] Bu amaç doğrultusunda üniversiteye Bilim Kentinin kısaltılmışı olan Bilkent adı verilmiştir",
    solved: true,
    department: "cs",
    replies: [
      {
        statedBy: "ali",
        context: "bu nası soru tarraaaam",
      },
      {
        statedBy: "veli",
        context: "bu nası soru tarraaaam",
      },
    ],
    statedBy: "ali bey",
  },
  {
    name: "Question 2",
    description:
      "Bilkent Üniversitesi ya da resmî adıyla İhsan Doğramacı Bilkent Üniversitesi, Türkiye'nin başkenti Ankara'da yer alan vakıf üniversitesi. İhsan Doğramacı tarafından, İhsan Doğramacı Eğitim Vakfı, İhsan Doğramacı Sağlık Vakfı ve İhsan Doğramacı Bilim ve Araştırma Vakfı kararlarıyla 20 Ekim 1984'te, Türkiye'nin ilk vakıf üniversitesi olarak kurulmuştur.[11] Bilkent Üniversitesi, kuruluş amacını eğitim kalitesi, bilimsel araştırma ve yayınları ile kültür ve sanat faaliyetleri açısından dünyanın önde gelen üniversiteleri arasında yer almak olarak açıklamıştır.[1] Bu amaç doğrultusunda üniversiteye Bilim Kentinin kısaltılmışı olan Bilkent adı verilmiştir",
    solved: true,
    department: "cs",
    replies: [
      {
        statedBy: "mehmet",
        context:
          "Bilkent Üniversitesi ya da resmî adıyla İhsan Doğramacı Bilkent Üniversitesi, Türkiye'nin başkenti Ankara'da yer alan vakıf üniversitesi. İhsan Doğramacı tarafından, İhsan Doğramacı Eğitim Vakfı, İhsan Doğramacı Sağlık Vakfı ve İhsan Doğramacı Bilim ve Araştırma Vakfı kararlarıyla 20 Ekim 1984'te, Türkiye'nin ilk vakıf üniversitesi olarak kurulmuştur.[11] Bilkent Üniversitesi, kuruluş amacını eğitim kalitesi, bilimsel araştırma ve yayınları ile kültür ve sanat faaliyetleri açısından dünyanın önde gelen üniversiteleri arasında yer almak olarak açıklamıştır.[1] Bu amaç doğrultusunda üniversiteye Bilim Kentinin kısaltılmışı olan Bilkent adı verilmiştir",
      },
      {
        statedBy: "musa",
        context: "bu nası soru tarraaaam",
      },
    ],
    statedBy: "ali bey",
  },
  {
    name: "Question 3",
    description:
      "Bilkent Üniversitesi ya da resmî adıyla İhsan Doğramacı Bilkent Üniversitesi, Türkiye'nin başkenti Ankara'da yer alan vakıf üniversitesi. İhsan Doğramacı tarafından, İhsan Doğramacı Eğitim Vakfı, İhsan Doğramacı Sağlık Vakfı ve İhsan Doğramacı Bilim ve Araştırma Vakfı kararlarıyla 20 Ekim 1984'te, Türkiye'nin ilk vakıf üniversitesi olarak kurulmuştur.[11] Bilkent Üniversitesi, kuruluş amacını eğitim kalitesi, bilimsel araştırma ve yayınları ile kültür ve sanat faaliyetleri açısından dünyanın önde gelen üniversiteleri arasında yer almak olarak açıklamıştır.[1] Bu amaç doğrultusunda üniversiteye Bilim Kentinin kısaltılmışı olan Bilkent adı verilmiştir",
    solved: true,
    department: "cs",
    replies: [
      {
        statedBy: "reis",
        context: "bu nası soru tarraaaam",
      },
      {
        statedBy: "ali",
        context: "bu nası soru tarraaaam",
      },
    ],

    statedBy: "ali bey",
  },
  {
    name: "Question 4",
    description:
      "Bilkent Üniversitesi ya da resmî adıyla İhsan Doğramacı Bilkent Üniversitesi, Türkiye'nin başkenti Ankara'da yer alan vakıf üniversitesi. İhsan Doğramacı tarafından, İhsan Doğramacı Eğitim Vakfı, İhsan Doğramacı Sağlık Vakfı ve İhsan Doğramacı Bilim ve Araştırma Vakfı kararlarıyla 20 Ekim 1984'te, Türkiye'nin ilk vakıf üniversitesi olarak kurulmuştur.[11] Bilkent Üniversitesi, kuruluş amacını eğitim kalitesi, bilimsel araştırma ve yayınları ile kültür ve sanat faaliyetleri açısından dünyanın önde gelen üniversiteleri arasında yer almak olarak açıklamıştır.[1] Bu amaç doğrultusunda üniversiteye Bilim Kentinin kısaltılmışı olan Bilkent adı verilmiştir",
    solved: false,
    department: "ee",
    replies: [
      {
        statedBy: "reis",
        context: "bu nası soru tarraaaam",
      },
      {
        statedBy: "ali",
        context: "bu nası soru tarraaaam",
      },
    ],
    statedBy: "ali bey",
  },
];

const forumPage = (props) => {
  const [filteredUniDepartment, setFilteredUniDepartment] = useState("cs");

  const filterChangeHandler = (selectedUnis) => {
    setFilteredUniDepartment(selectedUnis);
  };

  const filteredQuestions = props.threads.filter((question) => {
    return question.department.toLocaleLowerCase() == filteredUniDepartment;
  });

  return (
    <div>
      <NavbarMenu></NavbarMenu>
      <Row>
        <Col>
          <UniversitiesFilter
            selected={filteredUniDepartment}
            onChangeFilter={filterChangeHandler}
          ></UniversitiesFilter>
        </Col>
      </Row>
      <Row>
        <Col className="col-9">
          <ForumList forums={filteredQuestions}></ForumList>
        </Col>
        <Col className="col-3">
          <MostViewedList questions={filteredQuestions}></MostViewedList>
        </Col>
      </Row>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch("http://192.168.1.40:1000/api/forum/home/");
  const data = await res.json();
  return {
    props: {
      threads: data.map((thread) => ({
        users: {
          name: thread.user.name,
          surname: thread.user.surname,
        },
        header: thread.header,
        id: thread.id,
        replyCount: thread.reply_count,
        question: thread.question,
        date: thread.start_date,
        department: thread.department,
        solved: thread.solved,
        allReplies: false,
        replies: thread.replies.map((reply) => ({
          users: {
            name: reply.user.name,
            surname: reply.user.surname,
          },
          text: reply.text,
          date: reply.date,
        })),
      })),
    },
    revalidate: 1,
  };
}

export default forumPage;
