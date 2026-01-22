// Utility: Map Pokémon to notable trainers
function getTrainerForPokemon(pokemonName) {
  const notableTrainers = [
    { pokemon: "onix", trainer: "Brock", idNo: 12345 },
    { pokemon: "starmie", trainer: "Misty", idNo: 23456 },
    { pokemon: "pikachu", trainer: "Lt. Surge", idNo: 34567 },
    { pokemon: "alakazam", trainer: "Sabrina", idNo: 45678 },
    { pokemon: "rhydon", trainer: "Giovanni", idNo: 56789 },
  ];
  const GENERIC_TRAINER = { name: "TRAINER", idNo: 99999 };
  const entry = notableTrainers.find(
    (t) => t.pokemon.toLowerCase() === pokemonName.toLowerCase(),
  );
  if (entry) return { name: entry.trainer, idNo: entry.idNo };
  return GENERIC_TRAINER;
}
