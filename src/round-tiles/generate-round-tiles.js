import generateShuffledKeys from '../common/generate-shuffled-keys';
import roundTiles from '../data/round-tiles.json';

const generateTiles = (config) => {
  const { count: configCount } = config || {};
  const count = configCount !== undefined ? configCount : 6;

  return generateShuffledKeys(count, roundTiles.length, config);
};

export default generateTiles;
