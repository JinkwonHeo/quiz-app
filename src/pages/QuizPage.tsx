import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { CorrectCountState, CompleteTimeState, QuizListState } from '../recoil';
import { decode } from 'html-entities';
import { Button } from '../components/share/Button';
import styled from 'styled-components';
import getQuiz from '../api/getQuiz';
import { Container } from '../components/share/Container';
import { FlexContainer } from '../components/share/FlexContainer';

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
    const quiz = quizList.results[quizNumber];

    if (e.target.innerText === quiz.correct_answer) {
      setCorrectCount((prev) => prev + 1);
      setIsCorrect(true);
    } else {
      if (!window.localStorage.getItem(`${quiz.question}`)) {
        const quizToString = { ...quiz };
        quizToString.selected = e.target.innerText;
        const objString = JSON.stringify(quizToString);
        window.localStorage.setItem(`${quiz.question}`, objString);
      }
    }

    setCorrectAnswerIndex(randomQuizList.indexOf(quiz.correct_answer));
    setSelectedAnswer(index);
    setIsAnswerSelected(true);
  };

  return (
    <Container>
      <FlexContainer>
        <QuizPageContainer>
          {quizList.results.length && quizNumber < 10 ? (
            <>
              <QuizCount>question {quizNumber + 1} of 10</QuizCount>
              <TitleContainer>
                <QuizTitle>{decode(quizList.results[quizNumber].question)}</QuizTitle>
              </TitleContainer>
              <AnswerListWrapper>
                {randomQuizList.map((quiz, index) => (
                  <Fragment key={index}>
                    <AnswerList
                      className={
                        isAnswerSelected
                          ? selectedAnswer === index
                            ? isCorrect
                              ? 'green'
                              : 'red'
                            : correctAnswerIndex === index
                            ? 'green'
                            : 'gray'
                          : 'null'
                      }
                      disabled={isAnswerSelected}
                      onClick={(e) => handleClickAnswer(e, index)}
                    >
                      {decode(quiz)}
                    </AnswerList>
                  </Fragment>
                ))}
              </AnswerListWrapper>
            </>
          ) : null}
        </QuizPageContainer>
        <NoticeContainer>
          {isAnswerSelected ? (
            <Button onClick={handleNextQuizButton}>다음 문제</Button>
          ) : (
            <Button style={{ visibility: 'hidden', transitionDuration: 'unset' }}>hidden</Button>
          )}
        </NoticeContainer>
        {isAnswerSelected ? (
          isCorrect ? (
            <h2>정답입니다</h2>
          ) : (
            <h2>오답입니다</h2>
          )
        ) : (
          <h2 style={{ visibility: 'hidden' }}>hidden</h2>
        )}
      </FlexContainer>
    </Container>
  );
}

const QuizPageContainer = styled.div`
  padding: 1rem;
  margin: 0 1rem;
`;

const NoticeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const QuizCount = styled.div`
  font-family: 'Pretendard-light';
  color: white;
  opacity: 0.7;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 25vh;
`;

const QuizTitle = styled.div`
  font-size: 1.5rem;
  font-family: 'Pretendard-medium';
  color: white;
  line-height: 1.6;
`;

const AnswerListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .red {
    background: linear-gradient(to bottom, #ff2121, #ab1414);
    color: white;
  }

  .green {
    background: linear-gradient(to bottom, #90ff21, #569d14);
    color: white;
  }

  .gray {
    background-color: ${(props) => props.theme.colors.gray};
    color: white;
  }
`;

const AnswerList = styled(Button)`
  margin: 0.4rem 0;
  box-shadow: 5px 5px 8px 3px rgb(0 0 0 / 20%), 2px 2px 5px -2px rgba(0, 0, 0, 0.218),
    5px 2px 5px -7px rgb(0 0 0 / 20%);

  &:disabled {
    pointer-events: none;
  }
`;
