const createSetupString = (roundTiles, bonusCards) => (`${roundTiles.join('-')}_${bonusCards.join('-')}`);

export default createSetupString;
