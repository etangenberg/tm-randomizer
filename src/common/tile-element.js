import React from 'react';
import PropTypes from 'prop-types';

const TileElement = ({ className, src, id, onClick }) => (
<div
  onClick={onClick}
  className={className}
>
  <img src={src} alt={id} className="round-tile-image" />
</div>);

TileElement.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
}

export default TileElement;
