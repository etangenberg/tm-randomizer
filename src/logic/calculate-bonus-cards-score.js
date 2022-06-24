const calculateBonusCardTilesScore = (bonusCardsByKey, bonusCardPreference) => {
  if (!Array.isArray(bonusCardsByKey)) { throw new Error('bonusCardsByKey is not an array'); }
  if (typeof bonusCardPreference !== 'object') { throw new Error('bonusCardPreference is not an object'); }
};

export default calculateBonusCardTilesScore;
