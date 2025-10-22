import { LocalizeFileNamePipe } from './localize-file-name.pipe';

describe('LocalizeFileNamePipe', () => {
  it('create an instance', () => {
    const pipe = new LocalizeFileNamePipe('fa');
    expect(pipe).toBeTruthy();
  });
});
