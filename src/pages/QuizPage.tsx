import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { CorrectCountState, CompleteTimeState, QuizListState } from '../components/recoil';
import { decode } from 'html-entities';
import { Button } from '../components/share/Button';
import styled from 'styled-components';
import getQuiz from '../api/getQuiz';

export default function QuizPage() {
  const [correctCount, setCorrectCount] = useRecoilState(CorrectCountState);
  const [completeTime, setCompleteTime] = useRecoilState(CompleteTimeState);
  const [quizList, setQuizList] = useRecoilState(QuizListState);
  const [quizNumber, setQuizNumber] = useState<number>(0);
  const [randomQuizList, setRandomQuizList] = useState<string[]>([]);
  const [isAnswerSelected, setIsAnswerSelected] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number>(0);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number>(0);
  const countdownRef = useRef(0);
  const navigate = useNavigate();
  const { state } = useLocation();

  const { data } = useQuery(['quizList'], getQuiz, {
    suspense: true,
    refetchOnWindowFocus: false,
    cacheTime: 0,
    enabled: !state,
  });

  useEffect(() => {
    const interval = setInterval(() => (countdownRef.current += 1), 1000);
    if (!state) setQuizList(data);

    return () => {
      setCompleteTime(countdownRef.current);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (quizNumber === 10) return navigate('/result');

    if (quizList.results.length) {
      setRandomQuizList(
        [
          ...quizList.results[quizNumber].incorrect_answers,
          quizList.results[quizNumber].correct_answer,
        ].sort(() => Math.random() - 0.5)
      );
    }
  }, [quizNumber, quizList]);

  const handleNextQuizButton = () => {
    setQuizNumber((prev) => prev + 1);
    setIsAnswerSelected(false);
    setIsCorrect(false);
  };

  const handleClickAnswer = (e: React.BaseSyntheticEvent, index: number) => {
    if (e.target.innerText === quizList.results[quizNumber].correct_answer) {
      setCorrectCount((prev) => prev + 1);
      setIsCorrect(true);
    } else {
      if (!window.localStorage.getItem(`${quizList.results[quizNumber].question}`)) {
        const objString = JSON.stringify(quizList.results[quizNumber]);
        window.localStorage.setItem(`${quizList.results[quizNumber].question}`, objString);
      }
    }

    setCorrectAnswerIndex(randomQuizList.indexOf(quizList.results[quizNumber].correct_answer));
    setSelectedAnswer(index);
    setIsAnswerSelected(true);
  };

  return (
    <QuizPageContainer>
      {quizList.results.length && quizNumber < 10 ? (
        <>
          <QuizTitle>{decode(quizList.results[quizNumber].question)}</QuizTitle>
          <QuizListWrapper>
            {randomQuizList.map((quiz, index) => (
              <Fragment key={index}>
                <QuizList
                  className={
                    isAnswerSelected
                      ? selectedAnswer === index
                        ? isCorrect
                          ? 'green'
                          : 'red'
                        : correctAnswerIndex === index
                        ? 'green'
                        : 'transparent'
                      : 'null'
                  }
                  disabled={isAnswerSelected}
                  onClick={(e) => handleClickAnswer(e, index)}
                >
                  {decode(quiz)}
                </QuizList>
              </Fragment>
            ))}
          </QuizListWrapper>
        </>
      ) : null}
      {isAnswerSelected && <Button onClick={handleNextQuizButton}>다음 문제</Button>}
      {isAnswerSelected ? isCorrect ? <h2>정답입니다</h2> : <h2>오답입니다</h2> : null}
    </QuizPageContainer>
  );
}

const QuizPageContainer = styled.div`
  padding: 1rem;
`;

const QuizTitle = styled.h3``;

const QuizListWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .red {
    background-color: ${(props) => props.theme.colors.red};
  }

  .green {
    background-color: ${(props) => props.theme.colors.green};
  }

  .transparent {
    background-color: transparent;
  }
`;

const QuizList = styled(Button)`
  padding: 1rem;
  border: none;
  &:disabled {
    pointer-events: none;
  }
`;
