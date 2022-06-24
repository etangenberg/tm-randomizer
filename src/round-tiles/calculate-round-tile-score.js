const validateInput = (roundTilesByKey, roundTilesPreference) => {
  if (!Array.isArray(roundTilesByKey) || roundTilesByKey.length !== 6) {
    throw new Error('roundTilesByKey is not an array of 6 length');
  }
  if (typeof roundTilesPreference !== 'object') { throw new Error('roundTilesByPreference is not an object')}
};

const score = (tiles, prefer, weights) => {
  return prefer.reduce(
    (acc, tile) => {
      const index = tiles.indexOf(tile);
      if (index < 0) return acc;
      return acc + (weights[index] || 0);
    },
    0,
  )
};

const calculateRoundTilesScore = (roundTilesByKey, roundTilesPreference, weights) => {
  validateInput(roundTilesByKey, roundTilesPreference);


  const { prefer } = roundTilesPreference || {};
  const { early, middle, late } = prefer || {};

  const defEarlyWeights = [1, 1, 0.5];
  const defMiddleWeights = [0, 0.5, 1, 1, 0.5];
  const defLateWeights = [0, 0, 0, 0.5, 1, 1];
  const { early: ew, middle: mw, late: lw } = weights || {};
  const earlyWeights = ew || defEarlyWeights;
  const middleWeights = mw || defMiddleWeights;
  const lateWeights = lw || defLateWeights;

  const e = early && early.length ? score(roundTilesByKey, early, earlyWeights) : 0;
  const m = middle && middle.length ? score(roundTilesByKey, middle, middleWeights) : 0;
  const l = late && late.length ? score(roundTilesByKey, late, lateWeights) : 0;
  return e + m + l;
};

export default calculateRoundTilesScore;
