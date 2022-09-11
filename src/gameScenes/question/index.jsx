import {
  useCallback, useState, useEffect, useMemo,
} from 'react';
import { QUESTION } from '../../constants';
import RequestService from '../../services/RequestApi';
import { useRoom } from '../../services/roomContext';
import socket from '../../socket';
import PlayerChoose from './components/PlayerChoose';

import './styles.scss';

const QuestionPart = () => {
  const { room, setIsLoading } = useRoom();
  const [currQuestion, setCurrQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [questionAnswers, setQuestionAnswers] = useState([]);

  const handleSetQuestion = useCallback(async (item) => {
    setIsLoading(true);
    try {
      const [res] = await new RequestService(`question/set-question/${room._id}`)
        .post(item);

      setQuestionAnswers([]);
      setCurrQuestion(res);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!currQuestion) return () => {};

    socket.on(`setAnswer-${currQuestion.contentType}`, (newAnswer) => {
      setQuestionAnswers((prev) => [...prev, newAnswer]);
    });

    return () => {
      socket.off(`setAnswer-${currQuestion.contentType}`);
    };
  }, [currQuestion]);

  const handleNextQuestion = () => {
    const index = questions.findIndex((q) => q.contentType === currQuestion.contentType);

    const nextQuestion = questions[index + 1];

    if (nextQuestion) {
      handleSetQuestion(nextQuestion);
    }
  };

  const isAllAnswered = useMemo(() => room.players.every(({ uuid }) => (
    questionAnswers.some(({ author }) => author === uuid)
  )), [questionAnswers, room]);

  useEffect(() => {
    // calculate results
    if (!isAllAnswered) return () => {};

    const id = setTimeout(() => {
      handleNextQuestion();
    }, 2000);

    return () => {
      clearTimeout(id);
    };
  }, [isAllAnswered]);

  useEffect(() => {
    if (!room) return () => {};
    const allQuestions = room.gameItems.filter((el) => el.type === QUESTION);
    const [firstQuestion] = allQuestions;

    setQuestions(allQuestions);
    // timeout for text animation
    const id = setTimeout(() => {
      handleSetQuestion(firstQuestion);
    }, 2000);

    return () => {
      clearTimeout(id);
    };
  }, [room]);

  return (
    <div>
      {currQuestion && (
        <div className="question_players">
          {room.players.map((player) => {
            const answer = questionAnswers.find((q) => q.author === player.uuid);
            const answerPlayer = answer && room.players.find((pl) => pl.uuid === answer.value);

            return (
              <PlayerChoose
                answerPlayer={answerPlayer}
                player={player}
                key={player.uuid}
                showAnswer={isAllAnswered}
              />
            );
          })}
        </div>
      )}

    </div>
  );
};

export default QuestionPart;
