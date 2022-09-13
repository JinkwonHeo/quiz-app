import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';
import { decode } from 'html-entities';
import styled from 'styled-components';
import { Container } from '../components/share/Container';
import { FlexContainer } from '../components/share/FlexContainer';

export default function ReviewPage() {
  const [reviewQuiz, setReviewQuiz] = useState<any>([]);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      setReviewQuiz((prev: any) => [...prev, key]);
    }
  }, []);

  const handleMoveSpecificReview = (quiz: string) => {
    navigate('/review', { state: quiz });
  };

  const handlePrevPageButton = () => {
    if (state) return history.back();

    return navigate('/');
  };

  return (
    <>
      <Container>
        <FlexContainer>
          <Header>
            <IoChevronBack onClick={handlePrevPageButton} className="back-icon" />
            <ReviewPageTitle>Review</ReviewPageTitle>
          </Header>
          <ReviewContentWrapper>
            {reviewQuiz.map((quiz: string) => (
              <Fragment key={quiz}>
                <ReviewContent onClick={() => handleMoveSpecificReview(quiz)}>
                  {decode(quiz)}
                </ReviewContent>
              </Fragment>
            ))}
          </ReviewContentWrapper>
        </FlexContainer>
      </Container>
    </>
  );
}

const Header = styled.div`
  width: 100%;

  .back-icon {
    position: sticky;
    top: 3rem;
    padding-left: 1.5rem;
    font-size: 2.5rem;
    color: white;
    z-index: 10;
    cursor: pointer;
  }
`;

const ReviewPageTitle = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 2rem;
  text-align: center;
  font-family: 'Pretendard-bold';
  font-size: 2em;
  color: white;
  text-shadow: 3px 3px 6px black;
`;

const ReviewContentWrapper = styled.div`
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
    width: 0;
  }
`;

const ReviewContent = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #eee;
  transition-duration: 0.2s;
  font-size: 1rem;
  font-family: 'Pretendard-medium';
  color: white;
  line-height: 1.4;
  cursor: pointer;

  &:hover {
    background: #eee;
    color: black;
  }
`;
