import React, { Fragment, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { decode } from 'html-entities';
import { Button } from '../components/share/Button';
import styled from 'styled-components';
import getQuiz from '../api/getQuiz';

export default function QuizPage() {
  const [quizNumber, setQuizNumber] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [quizList, setQuizList] = useState<string[]>([]);
  const [isAnswerSelected, setIsAnswerSelected] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number>(0);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number>(0);

  const { data } = useQuery(['quizList'], getQuiz, {
    suspense: true,
    refetchOnWindowFocus: false,
    cacheTime: 0,
  });

  useEffect(() => {
    setQuizList(
      [...data.results[quizNumber].incorrect_answers, data.results[quizNumber].correct_answer].sort(
        () => Math.random() - 0.5
      )
    );
  }, [quizNumber]);

  const handleNextQuizButton = () => {
    setQuizNumber((prev) => prev + 1);
    setIsAnswerSelected(false);
    setIsCorrect(false);
  };

  const handleClickAnswer = (e: React.BaseSyntheticEvent, index: number) => {
    if (e.target.innerText === data.results[quizNumber].correct_answer) {
      setCorrectCount((prev) => prev + 1);
      setIsCorrect(true);
    }

    setCorrectAnswerIndex(quizList.indexOf(data.results[quizNumber].correct_answer));
    setSelectedAnswer(index);
    setIsAnswerSelected(true);
  };

  return (
    <QuizPageContainer>
      <h2>{quizNumber + 1}</h2>
      <h2>{correctCount}</h2>
      {data ? (
        <>
          <QuizTitle>{decode(data.results[quizNumber].question)}</QuizTitle>
          <QuizListWrapper>
            {quizList.map((quiz, index) => (
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
