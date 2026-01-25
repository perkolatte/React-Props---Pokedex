// All 151 Generation 1 Pokemon
const GENERATION_ONE_POKEMON = [
  { id: 1, name: "Bulbasaur", type: "grass", type2: "poison" },
  { id: 2, name: "Ivysaur", type: "grass", type2: "poison" },
  { id: 3, name: "Venusaur", type: "grass", type2: "poison" },
  { id: 4, name: "Charmander", type: "fire" },
  { id: 5, name: "Charmeleon", type: "fire" },
  { id: 6, name: "Charizard", type: "fire", type2: "flying" },
  { id: 7, name: "Squirtle", type: "water" },
  { id: 8, name: "Wartortle", type: "water" },
  { id: 9, name: "Blastoise", type: "water" },
  { id: 10, name: "Caterpie", type: "bug" },
  { id: 11, name: "Metapod", type: "bug" },
  { id: 12, name: "Butterfree", type: "bug", type2: "flying" },
  { id: 13, name: "Weedle", type: "bug", type2: "poison" },
  { id: 14, name: "Kakuna", type: "bug", type2: "poison" },
  { id: 15, name: "Beedrill", type: "bug", type2: "poison" },
  { id: 16, name: "Pidgey", type: "normal", type2: "flying" },
  { id: 17, name: "Pidgeotto", type: "normal", type2: "flying" },
  { id: 18, name: "Pidgeot", type: "normal", type2: "flying" },
  { id: 19, name: "Rattata", type: "normal" },
  { id: 20, name: "Raticate", type: "normal" },
  { id: 21, name: "Spearow", type: "normal", type2: "flying" },
  { id: 22, name: "Fearow", type: "normal", type2: "flying" },
  { id: 23, name: "Ekans", type: "poison" },
  { id: 24, name: "Arbok", type: "poison" },
  { id: 25, name: "Pikachu", type: "electric" },
  { id: 26, name: "Raichu", type: "electric" },
  { id: 27, name: "Sandshrew", type: "ground" },
  { id: 28, name: "Sandslash", type: "ground" },
  { id: 29, name: "Nidoran♀", type: "poison" },
  { id: 30, name: "Nidorina", type: "poison" },
  { id: 31, name: "Nidoqueen", type: "poison", type2: "ground" },
  { id: 32, name: "Nidoran♂", type: "poison" },
  { id: 33, name: "Nidorino", type: "poison" },
  { id: 34, name: "Nidoking", type: "poison", type2: "ground" },
  { id: 35, name: "Clefairy", type: "fairy" },
  { id: 36, name: "Clefable", type: "fairy" },
  { id: 37, name: "Vulpix", type: "fire" },
  { id: 38, name: "Ninetales", type: "fire" },
  { id: 39, name: "Jigglypuff", type: "normal", type2: "fairy" },
  { id: 40, name: "Wigglytuff", type: "normal", type2: "fairy" },
  { id: 41, name: "Zubat", type: "poison", type2: "flying" },
  { id: 42, name: "Golbat", type: "poison", type2: "flying" },
  { id: 43, name: "Oddish", type: "grass", type2: "poison" },
  { id: 44, name: "Gloom", type: "grass", type2: "poison" },
  { id: 45, name: "Vileplume", type: "grass", type2: "poison" },
  { id: 46, name: "Paras", type: "bug", type2: "grass" },
  { id: 47, name: "Parasect", type: "bug", type2: "grass" },
  { id: 48, name: "Venonat", type: "bug", type2: "poison" },
  { id: 49, name: "Venomoth", type: "bug", type2: "poison" },
  { id: 50, name: "Diglett", type: "ground" },
  { id: 51, name: "Dugtrio", type: "ground" },
  { id: 52, name: "Meowth", type: "normal" },
  { id: 53, name: "Persian", type: "normal" },
  { id: 54, name: "Psyduck", type: "water" },
  { id: 55, name: "Golduck", type: "water" },
  { id: 56, name: "Mankey", type: "fighting" },
  { id: 57, name: "Primeape", type: "fighting" },
  { id: 58, name: "Growlithe", type: "fire" },
  { id: 59, name: "Arcanine", type: "fire" },
  { id: 60, name: "Poliwag", type: "water" },
  { id: 61, name: "Poliwhirl", type: "water" },
  { id: 62, name: "Poliwrath", type: "water", type2: "fighting" },
  { id: 63, name: "Abra", type: "psychic" },
  { id: 64, name: "Kadabra", type: "psychic" },
  { id: 65, name: "Alakazam", type: "psychic" },
  { id: 66, name: "Machop", type: "fighting" },
  { id: 67, name: "Machoke", type: "fighting" },
  { id: 68, name: "Machamp", type: "fighting" },
  { id: 69, name: "Bellsprout", type: "grass", type2: "poison" },
  { id: 70, name: "Weepinbell", type: "grass", type2: "poison" },
  { id: 71, name: "Victreebel", type: "grass", type2: "poison" },
  { id: 72, name: "Tentacool", type: "water", type2: "poison" },
  { id: 73, name: "Tentacruel", type: "water", type2: "poison" },
  { id: 74, name: "Geodude", type: "rock", type2: "ground" },
  { id: 75, name: "Graveler", type: "rock", type2: "ground" },
  { id: 76, name: "Golem", type: "rock", type2: "ground" },
  { id: 77, name: "Ponyta", type: "fire" },
  { id: 78, name: "Rapidash", type: "fire" },
  { id: 79, name: "Slowpoke", type: "water", type2: "psychic" },
  { id: 80, name: "Slowbro", type: "water", type2: "psychic" },
  { id: 81, name: "Magnemite", type: "electric", type2: "steel" },
  { id: 82, name: "Magneton", type: "electric", type2: "steel" },
  { id: 83, name: "Farfetch'd", type: "normal", type2: "flying" },
  { id: 84, name: "Doduo", type: "normal", type2: "flying" },
  { id: 85, name: "Dodrio", type: "normal", type2: "flying" },
  { id: 86, name: "Seel", type: "water" },
  { id: 87, name: "Dewgong", type: "water", type2: "ice" },
  { id: 88, name: "Grimer", type: "poison" },
  { id: 89, name: "Muk", type: "poison" },
  { id: 90, name: "Shellder", type: "water" },
  { id: 91, name: "Cloyster", type: "water", type2: "ice" },
  { id: 92, name: "Gastly", type: "ghost", type2: "poison" },
  { id: 93, name: "Haunter", type: "ghost", type2: "poison" },
  { id: 94, name: "Gengar", type: "ghost", type2: "poison" },
  { id: 95, name: "Onix", type: "rock", type2: "ground" },
  { id: 96, name: "Drowzee", type: "psychic" },
  { id: 97, name: "Hypno", type: "psychic" },
  { id: 98, name: "Krabby", type: "water" },
  { id: 99, name: "Kingler", type: "water" },
  { id: 100, name: "Voltorb", type: "electric" },
  { id: 101, name: "Electrode", type: "electric" },
  { id: 102, name: "Exeggcute", type: "grass", type2: "psychic" },
  { id: 103, name: "Exeggutor", type: "grass", type2: "psychic" },
  { id: 104, name: "Cubone", type: "ground" },
  { id: 105, name: "Marowak", type: "ground" },
  { id: 106, name: "Hitmonlee", type: "fighting" },
  { id: 107, name: "Hitmonchan", type: "fighting" },
  { id: 108, name: "Lickitung", type: "normal" },
  { id: 109, name: "Koffing", type: "poison" },
  { id: 110, name: "Weezing", type: "poison" },
  { id: 111, name: "Rhyhorn", type: "ground", type2: "rock" },
  { id: 112, name: "Rhydon", type: "ground", type2: "rock" },
  { id: 113, name: "Chansey", type: "normal" },
  { id: 114, name: "Tangela", type: "grass" },
  { id: 115, name: "Kangaskhan", type: "normal" },
  { id: 116, name: "Horsea", type: "water" },
  { id: 117, name: "Seadra", type: "water" },
  { id: 118, name: "Goldeen", type: "water" },
  { id: 119, name: "Seaking", type: "water" },
  { id: 120, name: "Staryu", type: "water" },
  { id: 121, name: "Starmie", type: "water", type2: "psychic" },
  { id: 122, name: "Mr. Mime", type: "psychic", type2: "fairy" },
  { id: 123, name: "Scyther", type: "bug", type2: "flying" },
  { id: 124, name: "Jynx", type: "ice", type2: "psychic" },
  { id: 125, name: "Electabuzz", type: "electric" },
  { id: 126, name: "Magmar", type: "fire" },
  { id: 127, name: "Pinsir", type: "bug" },
  { id: 128, name: "Tauros", type: "normal" },
  { id: 129, name: "Magikarp", type: "water" },
  { id: 130, name: "Gyarados", type: "water", type2: "flying" },
  { id: 131, name: "Lapras", type: "water", type2: "ice" },
  { id: 132, name: "Ditto", type: "normal" },
  { id: 133, name: "Eevee", type: "normal" },
  { id: 134, name: "Vaporeon", type: "water" },
  { id: 135, name: "Jolteon", type: "electric" },
  { id: 136, name: "Flareon", type: "fire" },
  { id: 137, name: "Porygon", type: "normal" },
  { id: 138, name: "Omanyte", type: "rock", type2: "water" },
  { id: 139, name: "Omastar", type: "rock", type2: "water" },
  { id: 140, name: "Kabuto", type: "rock", type2: "water" },
  { id: 141, name: "Kabutops", type: "rock", type2: "water" },
  { id: 142, name: "Aerodactyl", type: "rock", type2: "flying" },
  { id: 143, name: "Snorlax", type: "normal" },
  { id: 144, name: "Articuno", type: "ice", type2: "flying" },
  { id: 145, name: "Zapdos", type: "electric", type2: "flying" },
  { id: 146, name: "Moltres", type: "fire", type2: "flying" },
  { id: 147, name: "Dratini", type: "dragon" },
  { id: 148, name: "Dragonair", type: "dragon" },
  { id: 149, name: "Dragonite", type: "dragon", type2: "flying" },
  { id: 150, name: "Mewtwo", type: "psychic" },
  { id: 151, name: "Mew", type: "psychic" },
];

// Add Pikachu at level 6 and Bulbasaur at level 15
const TEMP_POKEMON = [
  { id: 25, name: "Pikachu", type: "electric", level: 6 },
  { id: 1, name: "Bulbasaur", type: "grass", type2: "poison", level: 15 },
];

function ScreenshotCard({
  showGrid,
  screenshot = "original_gb_screenshot.png",
}) {
  // This card mimics Pokecard layout but just shows the screenshot image with overlays
  return (
    <div className={`Pokecard-wrapper ${showGrid ? "show-grid" : ""}`}>
      {/* Column numbers (top) */}
      {showGrid && (
        <div className="Pokecard-col-labels">
          {Array.from({ length: 20 }, (_, i) => (
            <span key={i} className="Pokecard-label">
              {i}
            </span>
          ))}
        </div>
      )}
      <div className="Pokecard-row-wrapper">
        {/* Row numbers (left) */}
        {showGrid && (
          <div className="Pokecard-row-labels">
            {Array.from({ length: 18 }, (_, i) => (
              <span key={i} className="Pokecard-label">
                {i}
              </span>
            ))}
          </div>
        )}
        <div className="Pokecard Pokecard-screenshot">
          <img
            src={screenshot}
            alt="GB Screenshot"
            className="Pokecard-screenshot-img"
          />
        </div>
      </div>
    </div>
  );
}

function Pokedex({ pokemon = TEMP_POKEMON } = {}) {
  const [showGrid, setShowGrid] = React.useState(true);
  const [showOverlay, setShowOverlay] = React.useState(true);
  const [showGbcFilter, setShowGbcFilter] = React.useState(false);

  const pokemonCards = pokemon.map((pokemonData) => (
    <Pokecard
      key={pokemonData.id}
      id={pokemonData.id}
      name={pokemonData.name}
      type={pokemonData.type}
      type2={pokemonData.type2}
      level={pokemonData.level}
      showGrid={showGrid}
      showScreenshotOverlay={showOverlay}
      showGbcFilter={showGbcFilter}
    />
  ));

  return (
    <>
      <header className="ui-header">
        <div
          className="ui-header-inner"
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <button
            className="grid-toggle-btn"
            onClick={() => setShowOverlay((v) => !v)}
          >
            {showOverlay
              ? "Hide Screenshot Overlay"
              : "Show Screenshot Overlay"}
          </button>
          <button
            className="grid-toggle-btn"
            onClick={() => setShowGbcFilter((v) => !v)}
          >
            {showGbcFilter ? "Hide GBC Color Filter" : "Show GBC Color Filter"}
          </button>
        </div>

        <div className="ui-header-toggle">
          <button
            className="grid-toggle-btn full-width-toggle"
            onClick={() => setShowGrid(!showGrid)}
          >
            {showGrid ? "Hide Grid" : "Show Grid"}
          </button>
        </div>
      </header>
      <div
        className="Pokedex"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 32,
          justifyContent: "center",
        }}
      >
        {pokemonCards}
        <ScreenshotCard showGrid={showGrid} />
      </div>
    </>
  );
}
