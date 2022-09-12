import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/share/Button';

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
      <div>여기에 이미지 넣을 것</div>
      <Button onClick={handleStartQuizButtonClick}>문제 풀기</Button>
      <Button onClick={handleMoveReviewPageButton}>오답 노트</Button>
    </>
  );
}
