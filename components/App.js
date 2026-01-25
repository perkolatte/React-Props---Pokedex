function App() {
  const [mode, setMode] = React.useState("pokedex");
  const [showGrid, setShowGrid] = React.useState(true);
  const [showOverlay, setShowOverlay] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [battleShuffleKey, setBattleShuffleKey] = React.useState(0);
  // Header/controls moved into components/Header.js

  const renderLabelCells = (label, leftBase) => {
    const chars = label.split("");
    const span = 8; // each half is 8 columns
    const start = leftBase + Math.floor((span - chars.length) / 2);
    return chars.map((ch, i) => (
      <span
        key={`${label}-${i}`}
        className="mode-cell"
        style={{ gridColumn: `${start + i} / ${start + i + 1}` }}
      >
        {ch}
      </span>
    ));
  };

  return (
    <div>
      <Header
        mode={mode}
        setMode={setMode}
        showGrid={showGrid}
        setShowGrid={setShowGrid}
        showOverlay={showOverlay}
        setShowOverlay={setShowOverlay}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onBattleShuffle={() => setBattleShuffleKey((k) => k + 1)}
      />

      <div className="main-content">
        {mode === "pokedex" ? (
          <Pokedex showGrid={showGrid} showOverlay={showOverlay} />
        ) : (
          <Pokegame
            showGrid={showGrid}
            showOverlay={showOverlay}
            regenKey={battleShuffleKey}
          />
        )}
      </div>
    </div>
  );
}
