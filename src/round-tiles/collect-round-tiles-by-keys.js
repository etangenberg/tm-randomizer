import roundTiles from '../data/round-tiles.json';

const collectRoundTilesByKeys = (keys) => {
  if (!keys) return [];
  
  return keys.map((key) => roundTiles.find((t) => t.key === key));
};

export default collectRoundTilesByKeys;
