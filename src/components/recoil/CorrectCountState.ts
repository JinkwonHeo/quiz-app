import { atom } from 'recoil';

export default atom<number>({
  key: 'CorrectCountState',
  default: 0,
});
