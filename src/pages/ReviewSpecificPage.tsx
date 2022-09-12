import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { decode } from 'html-entities';
import { IResults } from '../recoil/QuizListState';
import { Button } from '../components/share/Button';

export default function ReviewSpecificPage() {
  const [reviewData, setReviewData] = useState<IResults | null>(null);
  const navigate = useNavigate();

  const { state } = useLocation();

  useEffect(() => {
    const value = window.localStorage.getItem(String(state));
    setReviewData(JSON.parse(value as string));
  }, []);

  const handleMainPageButton = () => {
    navigate('/');
  };

  return (
    <ReviewContainer>
      {reviewData ? (
        <>
          <ReviewFlexContainer>
            <ReviewTitle>{decode(reviewData.question)}</ReviewTitle>
            <ReviewList>
              {reviewData.incorrect_answers.map((answer) => (
                <Fragment key={answer}>
                  <div>{answer}</div>
                </Fragment>
              ))}
              <div>{reviewData.correct_answer}</div>
            </ReviewList>
          </ReviewFlexContainer>
          <div>내가 선택한 답변: {reviewData.selected}</div>
        </>
      ) : null}
      <Button onClick={handleMainPageButton}>초기화면으로</Button>
    </ReviewContainer>
  );
}

const ReviewContainer = styled.div``;

const ReviewFlexContainer = styled.div`
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
