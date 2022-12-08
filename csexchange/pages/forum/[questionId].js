import NavbarMenu from "../../components/UI/NavbarMenu";
import { Col, Row } from "react-bootstrap";
import MostViewedList from "../../components/ForumPage/MostViewedList";
import Forum from "../../components/ForumPage/Forum";

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
  const res = await fetch("http://192.168.1.40:1000/api/forum/home/");
  const data = await res.json();

  return {
    fallback: false,
    paths: data.map((question) => ({
      params: { questionId: question.id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const link =
    "http://192.168.1.40:1000/api/forum/home/" +
    context.params.questionId +
    "/";

  const res = await fetch(link);
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
          users: {
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
