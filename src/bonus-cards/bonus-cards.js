import TileElement from "../common/tile-element";

const BonusCards = ({ bonusCards, onClick }) => (
  <div className="bonus-cards">
    {bonusCards.map((k, index) => (
      <TileElement
        className=" bonus-card"
        onClick={() => onClick && onClick(index, k)}
        {...k || {}}
      />))
    }
  </div>
);

export default BonusCards;
