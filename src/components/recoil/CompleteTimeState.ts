import { atom } from 'recoil';

export default atom<number>({
  key: 'CompleteTimeState',
  default: 0,
});
