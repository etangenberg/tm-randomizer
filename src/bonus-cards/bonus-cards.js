import TileElement from "../common/tile-element";

const BonusCards = ({ bonusCards }) => (
  <div className="bonus-cards">
    {bonusCards.map((k) => (
      <TileElement
        className=" bonus-card"
        {...k || {}}
      />))
    }
  </div>
);

export default BonusCards;
