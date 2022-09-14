import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook } from '@testing-library/react-hooks';
import { useQuizQuery } from '../hooks/useQuizQuery';
import getQuiz from '../api/getQuiz';
import { MOCK_DATA } from '../testUtils/mockData';

const originalError = console.error;

beforeAll(() => {
  console.error = (...args) => {
    if (/Warning: ReactDOM.render is no longer supported in React 18./.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

jest.mock('../api/getQuiz');

const mockedQuiz = jest.mocked(getQuiz, true);

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

test('react-query customHook test', async () => {
  mockedQuiz.mockResolvedValue(MOCK_DATA);

  const { result, waitFor } = renderHook(() => useQuizQuery(), {
    wrapper: createWrapper(),
  });

  await waitFor(() => result.current.isSuccess);

  expect(mockedQuiz).toHaveBeenCalledTimes(1);
  expect(result.current.data).toBeDefined();
  expect(result.current.data).toEqual(MOCK_DATA);
});
