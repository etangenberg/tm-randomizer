import generateTiles from './round-tiles/generate-round-tiles';
import generateCards from './bonus-cards/generate-bonus-cards';
import createSetupString from './create-setup-string';

const createSetup = (playerCount) => {
  const roundTiles = generateTiles(6);
  const bonusCards = generateCards(playerCount);
  return createSetupString(roundTiles, bonusCards);
};

export default createSetup;