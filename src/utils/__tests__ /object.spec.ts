import { isEmpty } from '../object';

describe('Object util test', () => {
  test('Should return ', () => {
    expect(isEmpty({})).toBe(true);
    expect(
      isEmpty({
        test: true,
      }),
    ).toBe(false);
  });
});
