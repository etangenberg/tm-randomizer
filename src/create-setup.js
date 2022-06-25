import generateTiles from './round-tiles/generate-round-tiles';
import generateCards from './bonus-cards/generate-bonus-cards';

const createSetup = (playerCount) => {
  const roundTiles = generateTiles(6);
  const bonusCards = generateCards(playerCount);
  return `${roundTiles.join('-')}_${bonusCards.join('-')}`;
};

export default createSetup;