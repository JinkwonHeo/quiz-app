import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import MainPage from './pages/MainPage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import ReviewPage from './pages/ReviewPage';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorUI from './components/ErrorUI';
import { Oval } from 'react-loader-spinner';

function App() {
  const queryClient = new QueryClient();
  return (
    <Suspense fallback={<h1>loading...</h1>}>
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
            <Route path="/review" element={<ReviewPage />} />
          </Routes>
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
