import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { CompleteTimeState, CorrectCountState } from '../recoil';
import { Button } from '../components/share/Button';
import PieChart from '../components/Chart';
import { Container } from '../components/share/Container';
import { FlexContainer } from '../components/share/FlexContainer';
import styled from 'styled-components';
import { ResultText } from '../components/share/ResultText';

export default function ResultPage() {
  const [correctCount, setCorrectCount] = useRecoilState(CorrectCountState);
  const [completeTime, setCompleteTime] = useRecoilState(CompleteTimeState);
  const navigate = useNavigate();

  const data = {
    labels: ['정답', '오답'],
    datasets: [
      {
        data: [correctCount, 10 - correctCount],
        backgroundColor: ['rgba(75, 192, 126, 0.9)', 'rgba(255, 60, 102, 0.9)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

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
    <Container>
      <FlexContainer>
        <ResultFlexContainer>
          <PieChartContainer>
            <PieChart chartData={data} />
          </PieChartContainer>
          <ResultTextFlexColumn>
            <ResultText>정답 갯수: {correctCount}개</ResultText>
            <ResultText>오답 갯수: {10 - correctCount}개</ResultText>
            <ResultText>소요 시간: {completeTime}초</ResultText>
          </ResultTextFlexColumn>
        </ResultFlexContainer>
        <Button onClick={handleRetryButton}>다시 풀기</Button>
        <Button onClick={handleMoveReviewPageButton}>오답 노트</Button>
        <Button onClick={handleMoveMainPageButton}>처음 화면으로</Button>
      </FlexContainer>
    </Container>
  );
}

const ResultFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 10rem;
  margin-bottom: 3rem;
`;

const PieChartContainer = styled.div`
  width: 60%;
`;

const ResultTextFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 2;
`;
