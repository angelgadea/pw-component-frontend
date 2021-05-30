import { StateQuotePipe } from './state-quote.pipe';

describe('StateQuotePipe', () => {
  let pipe: StateQuotePipe;

  beforeEach(() => {
    pipe = new StateQuotePipe();
  });

  it('create an instance', () => {
    pipe = new StateQuotePipe();
    expect(pipe).toBeTruthy();
  });
});
