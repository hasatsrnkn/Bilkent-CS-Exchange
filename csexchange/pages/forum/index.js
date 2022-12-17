import NavbarMenu from "../../components/UI/NavbarMenu";
import { Col, Row } from "react-bootstrap";
import UniversitiesFilter from "../../components/Universities/UniversitiesFilter";
import { useState } from "react";
import ForumList from "../../components/ForumPage/ForumList";
import MostViewedList from "../../components/ForumPage/MostViewedList";
import { API_FORUM_ENDPOINT } from "../api/api";

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
          <MostViewedList questions={props.mostViewedQuestions}></MostViewedList>
        </Col>
      </Row>
    </div>
  );
};

export async function getStaticProps() {
  const res1 = await fetch(API_FORUM_ENDPOINT + "home/");
  const homeThreads = await res1.json();

  const res2 = await fetch(API_FORUM_ENDPOINT + "home/most-viewed/");
  const mostViewedThreads = await res2.json();
  return {
    props: {
      threads: homeThreads.map((thread) => ({
        users: {
          name: thread.user.first_name,
          surname: thread.user.last_name,
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
          user: {
            name: reply.user.first_name,
            surname: reply.user.last_name,
          },
          text: reply.text,
          date: reply.date,
        })),
      })),
      mostViewedQuestions: mostViewedThreads.map((thread) => ({
        id: thread.id,
        header: thread.header,
        replyCount: thread.reply_count,
      })),
    },
    revalidate: 1,
  };
}

export default forumPage;
