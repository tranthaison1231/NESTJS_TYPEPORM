import { isEmpty } from '../object';

describe('Object util test', () => {
  test('Is empty object return true', () => {
    expect(isEmpty({})).toBe(true);
    expect(
      isEmpty({
        test: true,
      }),
    ).toBe(false);
  });
});
