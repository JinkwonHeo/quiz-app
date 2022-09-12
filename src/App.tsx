import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import MainPage from './pages/MainPage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import ReviewPage from './pages/ReviewPage';
import ReviewSpecificPage from './pages/ReviewSpecificPage';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorUI from './components/ErrorUI';
import './style/index.css';
import { Container } from './components/share/Container';
import { FlexContainer } from './components/share/FlexContainer';
import { Oval } from 'react-loader-spinner';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <Suspense
      fallback={
        <Container>
          <FlexContainer>
            <Oval
              height={70}
              width={70}
              color="white"
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#white"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </FlexContainer>
        </Container>
      }
    >
      <ErrorBoundary
        fallback={({ error, errorInfo }: { error: Error; errorInfo: string }) => (
          <ErrorUI error={error} errorInfo={errorInfo} />
        )}
      >
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/reviews" element={<ReviewPage />} />
            <Route path="/review" element={<ReviewSpecificPage />} />
          </Routes>
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
}
