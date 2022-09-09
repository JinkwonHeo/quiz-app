import React, { Fragment } from 'react';
import { useQuery } from 'react-query';
import getQuiz from '../api/getQuiz';

interface IQuizList {
  category: string;
  correct_answer: string;
  difficultly: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export default function QuizPage() {
  const { data, isLoading, error } = useQuery(['quizList'], getQuiz, {
    suspense: true,
    refetchOnWindowFocus: false,
    cacheTime: 0,
  });

  return (
    <>
      {data
        ? data.results.map((quiz: IQuizList, index: number) => (
            <Fragment key={index}>
              <div>{quiz?.category}</div>
            </Fragment>
          ))
        : null}
    </>
  );
}
