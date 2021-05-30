import { CustomAmountPipe } from './custom-amount.pipe';

describe('CustomAmountPipe', () => {
  let pipe: CustomAmountPipe;

  beforeEach(() => {
    pipe = new CustomAmountPipe();
  });

  it('create an instance', () => {
    pipe = new CustomAmountPipe();
    expect(pipe).toBeTruthy();
  });
});
