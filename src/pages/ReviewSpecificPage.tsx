import React, { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { decode } from 'html-entities';
import { IResults } from '../components/recoil/QuizListState';

export default function ReviewSpecificPage() {
  const [reviewData, setReviewData] = useState<IResults | null>(null);
  const { state } = useLocation();

  useEffect(() => {
    const value = window.localStorage.getItem(String(state));
    setReviewData(JSON.parse(value as string));
  }, []);

  return (
    <ReviewContainer>
      {reviewData ? (
        <>
          <ReviewTitle>{decode(reviewData.question)}</ReviewTitle>
          <ReviewList>
            {reviewData.incorrect_answers.map((choice) => (
              <Fragment key={choice}>
                <div>{choice}</div>
              </Fragment>
            ))}
          </ReviewList>
        </>
      ) : null}
    </ReviewContainer>
  );
}

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ReviewTitle = styled.div``;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
