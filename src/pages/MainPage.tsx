import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/share/Button';

export default function MainPage() {
  const navigate = useNavigate();

  const handleStartQuizButtonClick = () => {
    navigate('/quiz');
  };

  return (
    <>
      <div>여기에 이미지 넣을 것</div>
      <Button onClick={handleStartQuizButtonClick}>문제 풀기</Button>
    </>
  );
}
