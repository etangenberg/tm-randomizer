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
});
