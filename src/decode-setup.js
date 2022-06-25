const decodeSetup = (setup) => {
  const [roundTilesPart, bonusCardsPart] = setup.split('_');
  const roundTileKeys = roundTilesPart.split('-').map((s) => parseInt(s,10));
  const bonusCardKeys = bonusCardsPart.split('-').map((s) => parseInt(s,10));
  return {
    roundTileKeys,
    bonusCardKeys,
    playerCount: bonusCardKeys.length - 3,
  };
};

export default decodeSetup;
