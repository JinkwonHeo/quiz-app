import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { decode } from 'html-entities';
import styled from 'styled-components';

export default function ReviewPage() {
  const [reviewQuiz, setReviewQuiz] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      setReviewQuiz((prev: any) => [...prev, key]);
    }
  }, []);

  useEffect(() => {
    const item = document.querySelectorAll('.fancy-item');
    let count = 0;

    if (item.length) {
      const addActiveClass = () => {
        item[count].classList.add('active');
        count++;

        if (count >= item.length) {
          clearInterval(addActive);
        }
      };

      const addActive = setInterval(addActiveClass, 100);
    }
  }, [reviewQuiz]);

  const handleMoveSpecificReview = (quiz: string) => {
    navigate('/review', { state: quiz });
  };

  return (
    <>
      {reviewQuiz.map((quiz: string) => (
        <Fragment key={quiz}>
          <ReviewPageContainer>
            <ReviewContent className="fancy-item" onClick={() => handleMoveSpecificReview(quiz)}>
              {decode(quiz)}
            </ReviewContent>
          </ReviewPageContainer>
        </Fragment>
      ))}
    </>
  );
}

const ReviewPageContainer = styled.div`
  display: flex;

  .fancy-item {
    margin-top: 50px;
    opacity: 0;
    transition: 0.2s ease-in;
  }

  .fancy-item.active {
    margin-top: 0;
    opacity: 1;
  }
`;

const ReviewContent = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  transition-duration: 0.2s;
  cursor: pointer;

  &:hover {
    background: #eee;
  }
`;
