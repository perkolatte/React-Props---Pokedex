const DEFAULT_POKEMON = [
  { id: 4, name: "Charmander", type: "fire", level: 12 },
  { id: 7, name: "Squirtle", type: "water", level: 13 },
  { id: 11, name: "Metapod", type: "bug", level: 14 },
  { id: 12, name: "Butterfree", type: "flying", level: 18 },
  { id: 25, name: "Pikachu", type: "electric", level: 12 },
  { id: 39, name: "Jigglypuff", type: "normal", level: 10 },
  { id: 94, name: "Gengar", type: "poison", level: 22 },
  { id: 133, name: "Eevee", type: "normal", level: 11 },
];

function Pokedex({ pokemon = DEFAULT_POKEMON } = {}) {
  const cards = pokemon.map((pokemon) => (
    <Pokecard
      key={pokemon.id}
      id={pokemon.id}
      name={pokemon.name}
      type={pokemon.type}
      type2={pokemon.type2}
      level={pokemon.level}
    />
  ));

  return <div className="Pokedex">{cards}</div>;
}
