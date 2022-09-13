import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { decode } from 'html-entities';
import { IResults } from '../recoil/QuizListState';
import { Container } from '../components/share/Container';
import { FlexContainer } from '../components/share/FlexContainer';
import { IoChevronBack, IoHome } from 'react-icons/io5';
import styled from 'styled-components';

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

  const handlePrevPageButton = () => {
    if (state) return history.back();

    navigate('/');
  };

  return (
    <Container>
      <FlexContainer>
        <Header>
          <IconFlexContainer>
            <IoChevronBack onClick={handlePrevPageButton} className="back-icon" />
            <IoHome onClick={handleMainPageButton} className="home-icon" />
          </IconFlexContainer>
        </Header>
        {reviewData ? (
          <>
            <ReviewFlexContainer>
              <ReviewTitle>{decode(reviewData.question)}</ReviewTitle>
              <ReviewList>
                {reviewData.incorrect_answers.map((answer, index) => (
                  <Fragment key={answer}>
                    <ReviewAnswer>
                      {index + 1}. {decode(answer)}
                    </ReviewAnswer>
                  </Fragment>
                ))}
                <ReviewAnswer>4. {decode(reviewData.correct_answer)}</ReviewAnswer>
              </ReviewList>
            </ReviewFlexContainer>
            <AnswerContainer>
              <Tag>내 답변:</Tag>
              <MyAnswer>{decode(reviewData.selected)}</MyAnswer>
            </AnswerContainer>
            <AnswerContainer>
              <Tag>정답:</Tag>
              <CorrectAnswer>{decode(reviewData.correct_answer)}</CorrectAnswer>
            </AnswerContainer>
          </>
        ) : null}
      </FlexContainer>
    </Container>
  );
}

const ReviewFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Header = styled.div`
  position: fixed;
  width: 400px;
  top: 3rem;
  font-size: 2.5rem;
  color: white;
  z-index: 10;

  .back-icon,
  .home-icon {
    cursor: pointer;
  }
`;

const IconFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 1.5rem;
`;

const ReviewTitle = styled.div`
  margin: 1rem;
  padding: 1rem;
  font-size: 1.5rem;
  font-family: 'Pretendard-medium';
  color: white;
  line-height: 1.2;
`;

const ReviewList = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

const ReviewAnswer = styled.div`
  margin: 0 1rem;
  padding: 0 1rem;
  font-size: 1rem;
  font-family: 'Pretendard-light';
  color: white;
  line-height: 1.6;
`;

const AnswerContainer = styled.span`
  width: 100%;
`;

const MyAnswer = styled.span`
  font-size: 1rem;
  font-family: 'Pretendard-bold';
  color: #ff3826;
`;

const CorrectAnswer = styled.span`
  font-size: 1rem;
  font-family: 'Pretendard-bold';
  color: #72ff26;
`;

const Tag = styled.span`
  display: inline-block;
  width: 4rem;
  margin-left: 1rem;
  padding-left: 1rem;
  font-size: 1rem;
  font-family: 'Pretendard-light';
  color: white;
  opacity: 0.7;
`;
