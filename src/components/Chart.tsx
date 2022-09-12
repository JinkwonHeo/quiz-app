import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ chartData }: any) {
  const options = {
    maintainAspectRatio: false,
  };

  return (
    <Container>
      <Pie data={chartData} options={options} />
    </Container>
  );
}

const Container = styled.div`
  width: fit-content;
  height: fit-content;
  padding-right: 8rem;
`;
