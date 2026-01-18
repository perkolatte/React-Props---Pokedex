// Type chart source:
// BY HECTOR MADRIGAL, JIM MCQ, IGN-GAMEGUIDES, +8.6K MORE
// UPDATED MAR 17, 2013
// https://www.ign.com/wikis/pokemon-red-blue-yellow-version/Pokemon%20Types
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

const TYPE_MULTIPLIERS = {
  normal: { rock: 0.5, ghost: 0 },
  fire: {
    grass: 2,
    ice: 2,
    bug: 2,
    fire: 0.5,
    water: 0.5,
    rock: 0.5,
    dragon: 0.5,
  },
  water: { fire: 2, ground: 2, rock: 2, water: 0.5, grass: 0.5, dragon: 0.5 },
  electric: {
    water: 2,
    flying: 2,
    electric: 0.5,
    grass: 0.5,
    dragon: 0.5,
    ground: 0,
  },
  grass: {
    water: 2,
    ground: 2,
    rock: 2,
    fire: 0.5,
    grass: 0.5,
    poison: 0.5,
    flying: 0.5,
    bug: 0.5,
    dragon: 0.5,
  },
  ice: {
    grass: 2,
    ground: 2,
    flying: 2,
    dragon: 2,
    fire: 0.5,
    water: 0.5,
    ice: 0.5,
  },
  fighting: {
    normal: 2,
    ice: 2,
    rock: 2,
    poison: 0.5,
    flying: 0.5,
    psychic: 0.5,
    bug: 0.5,
    ghost: 0,
  },
  poison: { grass: 2, bug: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5 },
  ground: {
    fire: 2,
    electric: 2,
    poison: 2,
    rock: 2,
    grass: 0.5,
    bug: 0.5,
    flying: 0,
  },
  flying: { grass: 2, fighting: 2, bug: 2, electric: 0.5, rock: 0.5 },
  psychic: { fighting: 2, poison: 2, psychic: 0.5 },
  bug: {
    grass: 2,
    psychic: 2,
    fire: 0.5,
    fighting: 0.5,
    poison: 0.5,
    flying: 0.5,
    ghost: 0.5,
  },
  rock: { fire: 2, ice: 2, flying: 2, bug: 2, fighting: 0.5, ground: 0.5 },
  ghost: { ghost: 2, psychic: 0, normal: 0 },
  dragon: { dragon: 2 },
};

function getMultiplier(attacker, defender) {
  const table = TYPE_MULTIPLIERS[attacker];
  if (!table) return 1;
  const value = table[defender];
  return value === undefined ? 1 : value;
}

function randomLevel() {
  return Math.floor(Math.random() * 100) + 1;
}

function withEffectiveLevel(hand, opponentHand) {
  return hand.map((pokemon) => {
    const total = opponentHand.reduce(
      (sum, opponent) => sum + getMultiplier(pokemon.type, opponent.type),
      0
    );
    const average = total / opponentHand.length;
    const base = randomLevel();

    return {
      ...pokemon,
      level: Math.max(1, Math.floor(base * average)),
    };
  });
}

function pickRandomHand(pool, size) {
  const pokemon = [...pool];
  const hand = [];

  while (hand.length < size && pokemon.length > 0) {
    const randIdx = Math.floor(Math.random() * pokemon.length);
    hand.push(pokemon.splice(randIdx, 1)[0]);
  }

  return hand;
}

function Pokegame({ pokemon = DEFAULT_POKEMON } = {}) {
  const [pool, setPool] = React.useState(pokemon);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let isActive = true;
    setLoading(true);

    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => res.json())
      .then((data) =>
        Promise.all(
          data.results.map((pokemon) =>
            fetch(pokemon.url).then((res) => res.json())
          )
        )
      )
      .then((details) => {
        if (!isActive) return;
        const mapped = details.map((pokemon) => {
          const primaryType =
            pokemon.types && pokemon.types[0] && pokemon.types[0].type
              ? pokemon.types[0].type.name
              : "normal";
          const secondaryType =
            pokemon.types && pokemon.types[1] && pokemon.types[1].type
              ? pokemon.types[1].type.name
              : "";

          return {
            id: pokemon.id,
            name: pokemon.name,
            type: primaryType,
            type2: secondaryType,
            level: 1,
          };
        });
        setPool(mapped);
      })
      .catch((err) => {
        console.error("Failed to load PokéAPI data", err);
      })
      .finally(() => {
        if (isActive) setLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  if (loading && pool.length < 8) {
    return <div className="Pokegame">Loading...</div>;
  }

  if (pool.length < 8) {
    return <div className="Pokegame">Loading...</div>;
  }

  const hand1 = pickRandomHand(pool, 4);
  const remaining = pool.filter(
    (pokemon) => !hand1.some((picked) => picked.id === pokemon.id)
  );
  const hand2 = pickRandomHand(remaining, 4);
  const hand1WithLevel = withEffectiveLevel(hand1, hand2);
  const hand2WithLevel = withEffectiveLevel(hand2, hand1);

  return (
    <div className="Pokegame">
      <Pokedex pokemon={hand1WithLevel} />
      <Pokedex pokemon={hand2WithLevel} />
    </div>
  );
}
