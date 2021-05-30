import { FilterSearchPipe } from './filter-search.pipe';

describe('FilterSearchPipe', () => {
  let pipe: FilterSearchPipe;

  beforeEach(() => {
    pipe = new FilterSearchPipe();
  });

  it('create an instance', () => {
    pipe = new FilterSearchPipe();
    expect(pipe).toBeTruthy();
  });
});
