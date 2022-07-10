import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import NavBar from './common/nav-bar';
import createSetup from './create-random-setup';

const Select = () => {
  const { setup } = useParams();
  const navigate = useNavigate();
  if (setup) return <div>{setup}</div>

  return (
    <div className="page">
      <NavBar>
        <button className="select" onClick={() => navigate(`/setup=${createSetup(2)}`)}>Solo/2 players</button>
        <button className="select" onClick={() => navigate(`/setup=${createSetup(3)}`)}>3 players</button>
        <button className="select" onClick={() => navigate(`/setup=${createSetup(4)}`)}>4 players</button>
      </NavBar>
    </div>
  );
}

export default Select;
