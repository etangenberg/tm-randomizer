import React, { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import BonusCards from "./bonus-cards/bonus-cards";
import collectBonusCardsByKeys from "./bonus-cards/collect-bonus-bards-by-keys";
import createSetup from "./create-random-setup";
import decodeSetup from "./decode-setup";
import collectRoundTilesByKeys from "./round-tiles/collect-round-tiles-by-keys";
import RoundTiles from "./round-tiles/component/round-tiles";
import FactionScoring from "./scoring/faction-scoring";
import NavBar from "./common/nav-bar";
import createSetupString from './create-setup-string';

const Generated = () => {
  const [showFactionsScore, setFactionScore] = useState(false);
  const { setup: paramString } = useParams();
  const navigate = useNavigate();
  const setup = paramString && paramString.split('=').at(1);
  const {
    roundTileKeys,
    bonusCardKeys,
    playerCount,
  } = decodeSetup(setup);

  const roundTiles = collectRoundTilesByKeys(roundTileKeys);
  const bonusCards = collectBonusCardsByKeys(bonusCardKeys);

  const filledSetup = roundTiles.length && bonusCards.length;
  if (!filledSetup) {
    return (
      <div className="playerCountSelect">
        <div className="invalid-setup-message">No Valid setup found</div>
        <button className="select" onClick={() => navigate('/')}>Reset</button>
      </div>
    );
  }

  const incCard = (index, targetArray, maxKey) => {
    const nextArray = [...targetArray];
    const currentKey = targetArray.at(index);
    const nextKey = currentKey >= maxKey ? 1 : currentKey + 1;
    const nextKeyCurrentIndex = targetArray.findIndex((k) => k === nextKey);
    if (nextKeyCurrentIndex < 0)
      nextArray[index] = nextKey;
    else 
      nextArray[index] = nextArray.splice(nextKeyCurrentIndex, 1, targetArray[index])[0];

    if (targetArray === bonusCardKeys) navigate(`/setup=${createSetupString(roundTileKeys, nextArray)}`)
    else navigate(`/setup=${createSetupString(nextArray, bonusCardKeys)}`)
  };
  const onClick = (id) => navigate(`/board/${id}`);
  return (
    <div className="page">
      <NavBar>
        <button className="select" onClick={() => navigate(`/setup=${createSetup(playerCount)}`)}>Refresh</button>
        <button className="select" onClick={() => navigate('/')}>Reset</button>
      </NavBar>

      <RoundTiles roundTiles={roundTiles}  onClick={(index) => incCard(index, roundTileKeys, 8)}/>
      <BonusCards bonusCards={bonusCards} onClick={(index) => incCard(index, bonusCardKeys, 10)}/>
      <button className="select" onClick={() => setFactionScore(!showFactionsScore)}>
          {showFactionsScore ? 'Hide Factions' : 'Show Faction'}
        </button>
      {showFactionsScore
        ? <FactionScoring bonusCards={bonusCards} roundTiles={roundTiles} onClick={onClick} />
        : null}
    </div>
  );
};

export default Generated;
