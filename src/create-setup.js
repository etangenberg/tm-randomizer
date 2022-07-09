import generateTiles from './round-tiles/generate-round-tiles';
import generateCards from './bonus-cards/generate-bonus-cards';

import scoring from './data/round-tiles.json';

const createSetup = (playerCount) => {
  const validRoundTile = (round, key) => {
    if (round < 5) return true;

    const tile = scoring.find((t) => t.key === key);
    return !tile.id.startsWith('Spade'); 
  }
  const roundTiles = generateTiles({ validRoundTile });
  const bonusCards = generateCards(playerCount);
  return `${roundTiles.join('-')}_${bonusCards.join('-')}`;
};

export default createSetup;