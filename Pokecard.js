function Pokecard(props) {
  const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`;

  return (
    <div className="Pokecard">
      <h2 className="Pokecard-title">{props.name}</h2>
      <img src={imgSrc} alt={props.name} />
      <p className="Pokecard-type">Type: {props.type}</p>
      <p className="Pokecard-exp">EXP: {props.base_experience}</p>
    </div>
  );
}
