import { parseISO, format } from "date-fns";
import styles from "./styles.css";
import { ALL_POSTS } from "../../graphql/queries/getHTMLQuiz";
import PropTypes from "prop-types";
import React, { useState } from "react";

export const links = () => [{ rel: "stylesheet", href: styles }];

export default function Quiz({ props }) {
  const { modalOpenOrClosed } = props;
  const [quiz, setQuiz] = useState();

  const { error, data } = useQuery(ALL_POSTS, {
    onCompleted: (data) => setQuiz(data.allPosts),
  });

  console.log(quiz);

  return (
    <div>
      <h1>Quiz</h1>
    </div>
  );
}

Quiz.propTypes = {
  modalOpenOrClosed: PropTypes.object,
};
