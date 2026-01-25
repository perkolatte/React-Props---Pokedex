function Header({
  mode,
  setMode,
  showGrid,
  setShowGrid,
  showOverlay,
  setShowOverlay,
  menuOpen,
  setMenuOpen,
  onBattleShuffle,
}) {
  const headerRef = React.useRef(null);
  const toggleRef = React.useRef(null);
  const pokedexRef = React.useRef(null);
  const battleRef = React.useRef(null);

  React.useEffect(() => {
    const headerEl =
      headerRef.current || document.querySelector(".ui-header-new");
    if (!headerEl) return;
    const h = Math.ceil(headerEl.getBoundingClientRect().height || 0);
    document.documentElement.style.setProperty("--ui-header-height", `${h}px`);
  }, [mode, menuOpen, showGrid, showOverlay]);

  // Toggle global UI grid overlays when showGrid changes
  React.useEffect(() => {
    const root = document.documentElement;
    if (showGrid) root.classList.add("show-grid-global");
    else root.classList.remove("show-grid-global");
    return () => root.classList.remove("show-grid-global");
  }, [showGrid]);

  // Position the sliding highlighter under the active label group
  React.useEffect(() => {
    const card = toggleRef.current;
    const leftEl = pokedexRef.current;
    const rightEl = battleRef.current;
    if (!card || !leftEl || !rightEl) return;
    function updateHighlighter() {
      const cardRect = card.getBoundingClientRect();
      const target = mode === "pokedex" ? leftEl : rightEl;
      const tRect = target.getBoundingClientRect();
      const left = Math.round(tRect.left - cardRect.left) + "px";
      const width = Math.round(tRect.width) + "px";
      card.style.setProperty("--highlighter-left", left);
      card.style.setProperty("--highlighter-width", width);
    }
    updateHighlighter();
    window.addEventListener("resize", updateHighlighter);
    return () => window.removeEventListener("resize", updateHighlighter);
  }, [mode]);

  const renderLabelGroup = (label, id) => {
    const chars = label.split("");
    return React.createElement(
      "div",
      {
        key: `${id}-group`,
        className: `ui-toggle-group ${id}`,
        role: "presentation",
        onClick: (e) => {
          e.stopPropagation();
          // If user clicks the already-selected 'battle' group, request a shuffle
          if (id === "battle" && mode === "battle") {
            if (typeof onBattleShuffle === "function") onBattleShuffle();
          } else {
            setMode(id);
          }
        },
        ref: id === "pokedex" ? pokedexRef : id === "battle" ? battleRef : null,
      },
      chars.map((ch, i) =>
        React.createElement(
          "span",
          {
            key: `${id}-${i}`,
            className: "ui-toggle-cell",
          },
          ch,
        ),
      ),
    );
  };

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "header",
      { ref: headerRef, className: "ui-header-new" },
      React.createElement(
        "div",
        { className: "ui-header-inner-new" },
        React.createElement(
          "div",
          { className: "ui-toggle-wrapper" },
          React.createElement(
            "div",
            {
              className: `ui-toggle-card ${mode}`,
              role: "tablist",
              "aria-label": "Choose mode",
              onClick: () => setMode(mode === "pokedex" ? "battle" : "pokedex"),
              ref: toggleRef,
            },
            React.createElement(
              "div",
              { className: "ui-toggle-grid" },
              React.createElement("div", {
                className: "ui-highlighter",
                "aria-hidden": true,
              }),
              renderLabelGroup("POKÉDEX", "pokedex"),
              renderLabelGroup("BATTLE", "battle"),
            ),
          ),
        ),

        React.createElement(
          "div",
          { className: "ui-controls" },
          React.createElement(
            "button",
            {
              className: "ui-hamburger",
              onClick: () => setMenuOpen((v) => !v),
              "aria-expanded": menuOpen,
              "aria-label": "Open menu",
            },
            React.createElement(
              "span",
              { className: "ui-hamburger-icon" },
              "≡",
            ),
          ),
          menuOpen &&
            React.createElement(
              "div",
              { className: "ui-menu-panel" },
              React.createElement(
                "button",
                {
                  className: `ui-menu-btn ${showGrid ? "active" : ""}`,
                  onClick: () => setShowGrid((v) => !v),
                },
                "GRID",
              ),
              mode === "pokedex" &&
                React.createElement(
                  "button",
                  {
                    className: `ui-menu-btn ${showOverlay ? "active" : ""}`,
                    onClick: () => setShowOverlay((v) => !v),
                  },
                  "SCREENSHOT",
                ),
            ),
        ),
      ),
    ),
  );
}

// Expose globally for non-modular app entry points
window.Header = Header;
