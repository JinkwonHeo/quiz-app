import { atom } from 'recoil';

interface IQuizList {
  response_code: number;
  results: IResults[];
}

export interface IResults {
  category: string;
  correct_answer: string;
  difficultly: string;
  incorrect_answers: string[];
  question: string;
  type: string;
  selected: string;
}

export default atom<IQuizList>({
  key: 'QuizListState',
  default: {
    response_code: 0,
    results: [],
  },
});
