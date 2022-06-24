import sut from './calculate-round-tile-score';

const tiles = [1,2,3,4,5,6];
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
        ['a string'],
        [23232],
        [[1,2,3,4,5,6,7]],
        [[1,2,3,4,5]],
      ])('throws when first is not an array of length 6', (input) => {
        expect(() => sut(input, {})).toThrow();
      })

      it('accepts array of length 6', () => {
        expect(() => sut(tiles, {})).not.toThrow();
      });
    });

    describe('second', () => {
      it.each([
        ['a string'],
        [23232],
      ])('throws when not an object', (input) => {
        expect(() => sut(tiles, input)).toThrow();
      })
    });
  });

  describe('score', () => {
    it('scores 0 when no matches', () => {
      expect(sut(tiles, {})).toBe(0);
    });

    describe('prefer', () => {
      describe('early', () => {
        it.each([
          [[1], 1],
          [[2], 1],
          [[3], 0.5],
          [[4], 0],
          [[5], 0],
          [[6], 0],
        ])('weight match on index early %s on tiles gives %s', (early, value) => {
          expect(sut(tiles, { prefer: { early } } )).toBe(value);
        });
      });

      describe('middle', () => {
        it.each([
          [[1], 0],
          [[2], 0.5],
          [[3], 1],
          [[4], 1],
          [[5], 0.5],
          [[6], 0],
        ])('weight match on index middle %s on tiles gives %s', (middle, value) => {
          expect(sut(tiles, { prefer: { middle } } )).toBe(value);
        });
      });

      describe('late', () => {
        it.each([
          [[1], 0],
          [[2], 0],
          [[3], 0],
          [[4], 0.5],
          [[5], 1],
          [[6], 1],
        ])('weight match on index late %s on tiles gives %s', (late, value) => {
          expect(sut(tiles, { prefer: { late } } )).toBe(value);
        });
      });

      describe('combine', () => {
        it.each([
          [{ early: [2], middle: [3], late: [5]}, 3],
          [{ early: [3], middle: [2], late: [4]}, 1.5],
        ])('weight match on index late %s on tiles gives %s', (prefer, value) => {
          expect(sut(tiles, { prefer } )).toBe(value);
        });
      });
    });
  });
});
