import React, { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import BonusCards from "./bonus-cards/bonus-cards";
import collectBonusCardsByKeys from "./bonus-cards/collect-bonus-bards-by-keys";
import createSetup from "./create-setup";
import decodeSetup from "./decode-setup";
import collectRoundTilesByKeys from "./round-tiles/collect-round-tiles-by-keys";
import RoundTiles from "./round-tiles/component/round-tiles";
import FactionScoring from "./scoring/faction-scoring";

const Generated = () => {
  const [showFactionsScore, setFactionScore] = useState(false);
  const { setup: paramString } = useParams(); 
  const navigate = useNavigate();
  const setup = paramString.split('=').at(1);
  const {
    roundTileKeys,
    bonusCardKeys,
    playerCount,
  } = decodeSetup(setup);

  const roundTiles = collectRoundTilesByKeys(roundTileKeys);
  const bonusCards = collectBonusCardsByKeys(bonusCardKeys);
  
  return (
    <div>
      <div className="playerCountSelect">
        <button className="select" onClick={() => navigate(`/setup=${createSetup(playerCount)}`)}>Refresh</button>
        <button className="select" onClick={() => navigate('/')}>Reset</button>
      </div>
      <RoundTiles roundTiles={roundTiles} />
      <BonusCards bonusCards={bonusCards}/>
      <button className="select" onClick={() => setFactionScore(!showFactionsScore)}>
          {showFactionsScore ? 'Hide Factions' : 'Show Faction'}
        </button>
      {showFactionsScore
        ? <FactionScoring bonusCards={bonusCards} roundTiles={roundTiles} />
        : null}
      </div>  
  );
};

export default Generated;
