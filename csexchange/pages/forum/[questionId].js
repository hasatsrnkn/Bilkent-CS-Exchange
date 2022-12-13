import NavbarMenu from "../../components/UI/NavbarMenu";
import { Col, Row } from "react-bootstrap";
import Forum from "../../components/ForumPage/Forum";
import  { API_FORUM_ENDPOINT } from "../api/api";
const questionPage = (props) => {
  return (
    <div>
      <NavbarMenu></NavbarMenu>
      <Col className="col-9">
        <Forum
          key={props.threads.id}
          id={props.threads.id}
          users={props.threads.users}
          question={props.threads.question}
          date={props.threads.date}
          department={props.threads.department}
          replies={props.threads.replies}
          solved={props.threads.solved}
          header={props.threads.header}
          replyCount={props.threads.replyCount}
          allReplies={props.threads.allReplies}
        ></Forum>
      </Col>
      <Col className="col-3">
      </Col>
    </div>
  );
};

export async function getStaticPaths() {
  const res = await fetch(API_FORUM_ENDPOINT+"all-threads/");
  const data = await res.json();

  return {
    fallback: false,
    paths: data.map((question) => ({
      params: { questionId: question.id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const res = await fetch(API_FORUM_ENDPOINT + "thread/" + context.params.questionId + "/");
  const data = await res.json();
  return {
    props: {
      threads: {
        users: {
          name: data.user.name,
          surname: data.user.surname,
        },
        header: data.header,
        id: data.id,
        replyCount: data.reply_count,
        question: data.question,
        date: data.start_date,
        department: data.department,
        solved: data.solved,
        allReplies: true,
        replies: data.replies.map((reply) => ({
          user: {
            name: reply.user.name,
            surname: reply.user.surname,
          },
          text: reply.text,
          date: reply.date,
        })),
      },
    },
    revalidate: 1,
  };
}

export default questionPage;
