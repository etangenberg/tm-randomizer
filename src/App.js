import React from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";

import './App.css';
import Board from './board/board';
import Generated from './generated';
import Select from './select';

const App = ()  => {
  return (
    <Routes>
      <Route path="/board/:faction" element={<Board />} />
      <Route path=":setup" element={<Generated />} />
      <Route path="/" element={<Select />} />
    </Routes>
  );
}

export default App;
