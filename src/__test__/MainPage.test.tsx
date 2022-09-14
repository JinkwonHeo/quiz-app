import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRecoilValue, RecoilValue, RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import MainPage from '../pages/MainPage';
import App from '../App';
import theme from '../style/theme';
import { QuizListState } from '../recoil';

const RecoilObserver = ({
  node,
  onChange,
}: {
  node: RecoilValue<unknown>;
  onChange: any;
}): null => {
  const value = useRecoilValue(node);
  useEffect(() => onChange(value), [onChange, value]);

  return null;
};

const onChange = jest.fn();

describe('MainPage component test', () => {
  test('should show Quiz string', () => {
    render(
      <ThemeProvider theme={theme}>
        <MainPage />
      </ThemeProvider>,
      { wrapper: Router }
    );

    const mainPageText = screen.getByText('Quiz!');

    expect(mainPageText).toBeInTheDocument();
  });

  test('should render reviewPage when click 오답 노트 button', async () => {
    const user = userEvent.setup();

    render(
      <RecoilRoot>
        <Router>
          <ThemeProvider theme={theme}>
            <RecoilObserver node={QuizListState} onChange={onChange} />
            <App />
          </ThemeProvider>
        </Router>
      </RecoilRoot>
    );

    await user.click(screen.getByText('오답 노트'));

    expect(screen.getByText(/Review/i)).toBeInTheDocument();
    expect(screen.getByText(/없습니다/)).toBeInTheDocument();
  });
});
