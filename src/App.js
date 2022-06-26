import React from 'react';
import {
  Routes,
  Route,
  // Outlet,
  // Link,
  // useSearchParams,
  // useParams,
} from "react-router-dom";

// import generateCards from './bonus-cards/generate-bonus-cards';
// import generateTiles from './round-tiles/generate-round-tiles';

import './App.css';
import Board from './board/board';
import Generated from './generated';
import Select from './select';

const App = ()  => {
  // const playerCount = 2;
  // const roundTiles = generateTiles(6); 
  // const bonusCards = generateCards(playerCount);

  return (
    <Routes>
        <Route path="/board" element={<Board />} />
        <Route path=":setup" element={<Generated />} />
        <Route path="/" element={<Select />} />
    </Routes>
  );
}

export default App;
