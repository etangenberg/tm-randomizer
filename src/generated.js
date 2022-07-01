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

  const onClick = (id) => navigate(`/board/${id}`);
  return (
    <div>
      <a href='https://boardgamegeek.com/file/download_redirect/19d79ac39ef3f61b44df7eae5ba04b089f62116038be06cd/Terra+Mystica+Strategy+Reference+Sheet+v0_5.pdf'>
        Used ref
      </a>
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
        ? <FactionScoring bonusCards={bonusCards} roundTiles={roundTiles} onClick={onClick} />
        : null}
      </div>  
  );
};

export default Generated;
