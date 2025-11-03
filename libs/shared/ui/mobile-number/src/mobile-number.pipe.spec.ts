import { MobileNumberPipe } from './mobile-number.pipe';

describe('MobileNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new MobileNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
