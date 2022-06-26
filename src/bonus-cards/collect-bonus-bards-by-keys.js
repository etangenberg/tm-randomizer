import bonusCards from '../data/bonus-cards.json';

const collectBonusCardsByKeys = (keys) => {
  if (!keys) return [];
  
  return keys.map((key) => bonusCards.find((t) => t.key === key))
};

export default collectBonusCardsByKeys;
