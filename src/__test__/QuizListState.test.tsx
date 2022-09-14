import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRecoilValue, RecoilValue, RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
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

describe('recoil test', () => {
  test('QuizListState test', async () => {
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

    await user.click(screen.getByText('문제 풀기'));

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith({ response_code: 0, results: [] });
    });
  });
});
