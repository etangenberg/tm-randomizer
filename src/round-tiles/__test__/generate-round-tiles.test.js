import sut from '../generate-round-tiles';

describe('Generate round tiles', () => {
  it('generates array length 6', () => {
    expect(sut()).toHaveLength(6);
  });

  it('can have config', () => {
    const config = {
      count: 3,
      validRoundTile: (round, keyTile) => {
        return !(round === 2 && keyTile === 2)
      },
      shuffleArray: jest.fn((x) => (x)),
    };
    
    const result = sut(config);
    expect(result).toHaveLength(3);
    expect(result).toEqual([1,3,4]);
  });
});