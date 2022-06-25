import sut from './decode-setup';

describe('Decode setup', () => { 
  it('exists', () => {
    expect(sut).toBeDefined();
  });

  it('Decodes', () => {
    expect(sut('1-2-3-4-5-6_7-8-9-10-11')).toEqual({
      roundTileKeys: [1,2,3,4,5,6],
      bonusCardKeys: [7,8,9,10,11],
      playerCount: 2
    });
  });
});
