import { atom, RecoilValue, Loadable, WrappedValue } from 'recoil';

interface IQuizList {
  response_code: number;
  results: IResults[];
}

interface IResults {
  category: string;
  correct_answer: string;
  difficultly: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export default atom<IQuizList>({
  key: 'QuizListState',
  default: {
    response_code: 0,
    results: [],
  },
});
