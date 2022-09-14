import React from 'react';
import { useQuery, UseQueryOptions } from 'react-query';
import getQuiz from '../api/getQuiz';

export const useQuizQuery = (options?: UseQueryOptions<boolean>) =>
  useQuery<boolean>(['quizList'], getQuiz, {
    refetchOnWindowFocus: false,
    cacheTime: 0,
    ...options,
  });
