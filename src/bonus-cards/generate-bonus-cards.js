import generateShuffledKeys from '../common/generate-shuffled-keys';
import bonusCards from '../data/bonus-cards.json';

const collectBonusCardsByKeys = (keys) => (
  keys.map((key) => bonusCards.find((t) => t.key === key))  
);
const generateCards = (playerCount) => {
  const usedBonusCardsKeys = generateShuffledKeys(playerCount + 3, 10)
  return collectBonusCardsByKeys(usedBonusCardsKeys);
};

export default generateCards;
