import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { CompleteTimeState, CorrectCountState } from '../components/recoil';
import { Button } from '../components/share/Button';

export default function ResultPage() {
  const [correctCount, setCorrectCount] = useRecoilState(CorrectCountState);
  const [completeTime, setCompleteTime] = useRecoilState(CompleteTimeState);
  const navigate = useNavigate();

  const handleMoveReviewPageButton = () => {
    navigate('/reviews');
  };

  const handleRetryButton = () => {
    setCorrectCount(0);
    setCompleteTime(0);
    navigate('/quiz', { state: true });
  };

  const handleMoveMainPageButton = () => {
    setCorrectCount(0);
    setCompleteTime(0);
    navigate('/');
  };

  return (
    <>
      <h1>정답 갯수: {correctCount}</h1>
      <h1>오답 갯수: {10 - correctCount}</h1>
      <h1>소요 시간: {completeTime}</h1>
      <Button onClick={handleRetryButton}>다시 풀기</Button>
      <Button onClick={handleMoveReviewPageButton}>오답 노트</Button>
      <Button onClick={handleMoveMainPageButton}>처음 화면으로</Button>
    </>
  );
}
