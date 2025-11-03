import { HumanizeHoursPipe } from './humanize-hours.pipe';

describe('HumanizeHoursPipe', () => {
  it('create an instance', () => {
    const pipe = new HumanizeHoursPipe();
    expect(pipe).toBeTruthy();
  });
});
