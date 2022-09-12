import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../components/share/Button';
import { Container } from '../components/share/Container';
import { FlexContainer } from '../components/share/FlexContainer';

export default function MainPage() {
  const navigate = useNavigate();

  const handleStartQuizButtonClick = () => {
    navigate('/quiz');
  };

  const handleMoveReviewPageButton = () => {
    navigate('/reviews');
  };

  return (
    <>
      <Container>
        <FlexContainer>
          <Title>Quiz!</Title>
          <MainPageButton onClick={handleStartQuizButtonClick}>문제 풀기</MainPageButton>
          <MainPageButton onClick={handleMoveReviewPageButton}>오답 노트</MainPageButton>
        </FlexContainer>
      </Container>
    </>
  );
}

const Title = styled.div`
  margin-bottom: 5rem;
  font-family: 'Pretendard-bold';
  font-size: 4rem;
  color: white;
  text-shadow: 6px 6px 12px black;
`;

const MainPageButton = styled(Button)`
  width: 80%;
  padding: 1rem 0;
  margin: 0.5rem 0;
  box-shadow: 5px 5px 8px 3px rgb(0 0 0 / 20%), 2px 2px 5px -2px rgba(0, 0, 0, 0.218),
    5px 2px 5px -7px rgb(0 0 0 / 20%);
`;
