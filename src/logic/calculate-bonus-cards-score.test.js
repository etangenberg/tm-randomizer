import sut from './calculate-bonus-cards-score';

describe('Function - sut', () => {
  beforeEach(() => jest.resetAllMocks());

  it('exists', () => {
    expect(sut).toBeDefined();
  });

  it('is a function', () => {
    // Arange
    expect(typeof sut === 'function').toBe(true);
  });

  describe('validate input', () => {
    describe('first', () => {
      it.each([
        [undefined],
        ['astring'],
        [123213],
        [{ an: 'object' }],
      ])('throws when first is not an array, but %s', (input) => {
        expect(() => sut(input, {})).toThrow();
      });

      it('accepts array', () => {
        expect(() => sut([], {})).not.toThrow();
      });
    });

    describe('second', () => {
      it.each([
        [undefined],
        ['astring'],
        [123213],
      ])('throws when second is not an object, but %s', (input) => {
        expect(() => sut([], input)).toThrow();
      });
    })
  });

  describe('output', () => {
    it('empty returns undefined', () => {
      expect(sut([], {})).toBeUndefined();
    });

    it.each([
      [[1,2,3], 3],
      [[1,6,7,9], 4]
    ])('prefer all returns length, so %s returns %d', (bonusCards, value) => {
      const preference = { prefer: bonusCards };
      expect(sut(bonusCards, preference)).toBe(value);
    });

    it.each([
      [[1,2,3], [1,2], 2],
      [[1,6,7,9], [6,9], 2],
      [[1,6,7,9], [6], 1],
    ])('scores 1 per prefer match, so %s, with preference %s returns %d', (bonusCards, prefer, value) => {
      const preference = { prefer };
      expect(sut(bonusCards, preference)).toBe(value);
    });

    it.each([
      [[1,2,3], [1,2], -2],
      [[1,6,7,9], [6,9], -2],
      [[1,6,7,9], [6], -1],
    ])('scores  -1 per dislike match, so %s, with preference %s returns %d', (bonusCards, dislike, value) => {
      const preference = { dislike };
      expect(sut(bonusCards, preference)).toBe(value);
    });


    it.each([
      [[1,2,3], [1,2], [3], 1],
      [[1,6,7,9], [6,9], [1,7], 0],
      [[1,6,7,9], [6, 7], [], 2],
    ])('adds prefer and like, so %s and %s, with preference %s returns %d', (bonusCards, prefer, dislike, value) => {
      const preference = { prefer, dislike };
      expect(sut(bonusCards, preference)).toBe(value);
    });
  });
});
