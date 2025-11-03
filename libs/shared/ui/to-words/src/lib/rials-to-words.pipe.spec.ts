import { RialsToWordsPipe } from './rials-to-words.pipe';

describe('RialsToWordsPipe', () => {
  it('create an instance', () => {
    const pipe = new RialsToWordsPipe('fa-IR');
    expect(pipe).toBeTruthy();
  });
});
