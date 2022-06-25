import generateShuffledKeys from '../common/generate-shuffled-keys';
import roundTiles from '../data/round-tiles.json';

const collectRoundTilesByKeys = (keys) => {
  return keys.map((key) => roundTiles.find((t) => t.key === key));
};

const generateTiles = (count = 6) => {
  const usedRoundTilesKeys =  generateShuffledKeys(count, roundTiles.length)
  return collectRoundTilesByKeys(usedRoundTilesKeys);
};

export default generateTiles;
