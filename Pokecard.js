function Pokecard(props) {
  const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`;
  const idNo = String(props.id).padStart(5, "0");

  return (
    <div className="Pokecard">
      <div className="Pokecard-top">
        <div className="Pokecard-sprite">
          <img src={imgSrc} alt={props.name} />
        </div>
        <div className="Pokecard-summary">
          <div className="Pokecard-name">{props.name}</div>
          <div className="Pokecard-level">:L {props.level}</div>
          <div className="Pokecard-status">STATUS/OK</div>
        </div>
      </div>

      <div className="Pokecard-no">No. {idNo}</div>

      <div className="Pokecard-bottom">
        <div className="Pokecard-stats">
          <div className="Pokecard-stat">ATTACK</div>
          <div className="Pokecard-stat">DEFENSE</div>
          <div className="Pokecard-stat">SPEED</div>
          <div className="Pokecard-stat">SPECIAL</div>
        </div>
        <div className="Pokecard-meta">
          <div className="Pokecard-type">TYPE1/{props.type}</div>
          <div className="Pokecard-type">
            TYPE2/{props.type2 ? props.type2 : ""}
          </div>
          <div className="Pokecard-idno">IDNo./{idNo}</div>
        </div>
      </div>
    </div>
  );
}
