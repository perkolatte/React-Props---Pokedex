// Type chart source:
// BY HECTOR MADRIGAL, JIM MCQ, IGN-GAMEGUIDES, +8.6K MORE
// UPDATED MAR 17, 2013
// https://www.ign.com/wikis/pokemon-red-blue-yellow-version/Pokemon%20Types
const STARTER_POKEMON_POOL = [
  { id: 4, name: "Charmander", type: "fire", level: 12 },
  { id: 7, name: "Squirtle", type: "water", level: 13 },
  { id: 11, name: "Metapod", type: "bug", level: 14 },
  { id: 12, name: "Butterfree", type: "flying", level: 18 },
  { id: 25, name: "Pikachu", type: "electric", level: 12 },
  { id: 39, name: "Jigglypuff", type: "normal", level: 10 },
  { id: 94, name: "Gengar", type: "poison", level: 22 },
  { id: 133, name: "Eevee", type: "normal", level: 11 },
];

const TYPE_EFFECTIVENESS_CHART = {
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

function calculateTypeEffectiveness(attackerType, defenderType) {
  const effectivenessTable = TYPE_EFFECTIVENESS_CHART[attackerType];
  if (!effectivenessTable) return 1;
  const multiplier = effectivenessTable[defenderType];
  return multiplier === undefined ? 1 : multiplier;
}

function generateRandomLevel() {
  return Math.floor(Math.random() * 100) + 1;
}

function calculateEffectiveLevels(playerHand, opponentHand) {
  return playerHand.map((pokemon) => {
    const totalEffectiveness = opponentHand.reduce(
      (sum, opponent) =>
        sum + calculateTypeEffectiveness(pokemon.type, opponent.type),
      0,
    );
    const averageEffectiveness = totalEffectiveness / opponentHand.length;
    const baseLevel = generateRandomLevel();

    return {
      ...pokemon,
      level: Math.max(1, Math.floor(baseLevel * averageEffectiveness)),
    };
  });
}

function selectRandomPokemon(availablePool, count) {
  const remainingPokemon = [...availablePool];
  const selectedPokemon = [];

  while (selectedPokemon.length < count && remainingPokemon.length > 0) {
    const randomIndex = Math.floor(Math.random() * remainingPokemon.length);
    selectedPokemon.push(remainingPokemon.splice(randomIndex, 1)[0]);
  }

  return selectedPokemon;
}

function Pokegame({ pokemon = STARTER_POKEMON_POOL } = {}) {
  const [pokemonPool, setPokemonPool] = React.useState(pokemon);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => response.json())
      .then((data) =>
        Promise.all(
          data.results.map((pokemonEntry) =>
            fetch(pokemonEntry.url).then((response) => response.json()),
          ),
        ),
      )
      .then((pokemonDetails) => {
        if (!isMounted) return;
        const formattedPokemon = pokemonDetails.map((pokemonData) => {
          const primaryType =
            pokemonData.types &&
            pokemonData.types[0] &&
            pokemonData.types[0].type
              ? pokemonData.types[0].type.name
              : "normal";
          const secondaryType =
            pokemonData.types &&
            pokemonData.types[1] &&
            pokemonData.types[1].type
              ? pokemonData.types[1].type.name
              : "";

          return {
            id: pokemonData.id,
            name: pokemonData.name,
            type: primaryType,
            type2: secondaryType,
            level: 1,
          };
        });
        setPokemonPool(formattedPokemon);
      })
      .catch((error) => {
        console.error("Failed to load PokéAPI data", error);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading && pokemonPool.length < 8) {
    return <div className="Pokegame">Loading...</div>;
  }

  if (pokemonPool.length < 8) {
    return <div className="Pokegame">Loading...</div>;
  }

  const playerOneHand = selectRandomPokemon(pokemonPool, 4);
  const remainingPokemon = pokemonPool.filter(
    (pokemon) => !playerOneHand.some((selected) => selected.id === pokemon.id),
  );
  const playerTwoHand = selectRandomPokemon(remainingPokemon, 4);
  const playerOneWithLevels = calculateEffectiveLevels(
    playerOneHand,
    playerTwoHand,
  );
  const playerTwoWithLevels = calculateEffectiveLevels(
    playerTwoHand,
    playerOneHand,
  );

  return (
    <div className="Pokegame">
      <Pokedex pokemon={playerOneWithLevels} />
      <Pokedex pokemon={playerTwoWithLevels} />
    </div>
  );
}

// No export needed for in-browser Babel. Pokegame is now a global function.
