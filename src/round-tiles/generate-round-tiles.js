import generateShuffledKeys from '../common/generate-shuffled-keys';
import roundTiles from '../data/round-tiles.json';

const generateTiles = (count = 6) => {
  return generateShuffledKeys(count, roundTiles.length)
};

export default generateTiles;
