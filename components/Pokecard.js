// Helper to render grid-aligned text (each character in its own cell)
// half: "top" or "bottom"
function GridText({ children, startCol = 0, row = 0, half = "" }) {
  const text = String(children);
  const halfClass = half ? `q-${half}` : "";
  return (
    <span
      className={`Pokecard-grid-text ${halfClass}`}
      style={{
        left: `calc(var(--grid-padding) + ${startCol} * var(--cell-width))`,
        top: `calc(var(--grid-padding) + ${row} * var(--row-height))`,
      }}
    >
      {text.split("").map((char, index) => (
        <span key={index} data-grid-char>
          {char}
        </span>
      ))}
    </span>
  );
}

// Gen 1 base stats for Bulbasaur
const BASE_STATS = {
  1: {
    hp: 45,
    attack: 49,
    defense: 49,
    speed: 45,
    special: 65,
  },
};

// Gen 1 stat calculation formulas
function calcStat(base, level, iv = 15, ev = 0) {
  // Non-HP stat
  return Math.floor(
    (((base + iv) * 2 + Math.floor(Math.sqrt(ev) / 4)) * level) / 100 + 5,
  );
}

function calcHP(base, level, iv = 15, ev = 0) {
  return Math.floor(
    (((base + iv) * 2 + Math.floor(Math.sqrt(ev) / 4)) * level) / 100 +
      level +
      10,
  );
}

function getRandomIV() {
  return Math.floor(Math.random() * 16); // 0-15
}

function getHPIV(ivA, ivD, ivS, ivSp) {
  // HP IV is made from the LSBs of the other IVs
  return ((ivA & 1) << 3) | ((ivD & 1) << 2) | ((ivS & 1) << 1) | (ivSp & 1);
}

function Pokecard(props) {
  // No overlay images
  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/yellow/${props.id}.png`;
  const formattedIdNo = String(props.id).padStart(5, "0");
  const pokedexNumber = String(props.id).padStart(3, "0");
  const level = Number(props.level) || 1;
  const base = BASE_STATS[props.id] || BASE_STATS[1];

  // Generate IVs once per card instance
  const [ivs] = React.useState(() => {
    const attack = getRandomIV();
    const defense = getRandomIV();
    const speed = getRandomIV();
    const special = getRandomIV();
    const hp = getHPIV(attack, defense, speed, special);
    return { hp, attack, defense, speed, special };
  });
  const ev = 0; // Gen 1: new Pokémon start with 0 EVs

  const maxHp = calcHP(base.hp, level, ivs.hp, ev);
  const currentHp = maxHp;
  const hpPercentage = Math.min(
    100,
    Math.max(8, Math.floor((currentHp / maxHp) * 100)),
  );
  const stats = {
    attack: calcStat(base.attack, level, ivs.attack, ev),
    defense: calcStat(base.defense, level, ivs.defense, ev),
    speed: calcStat(base.speed, level, ivs.speed, ev),
    special: calcStat(base.special, level, ivs.special, ev),
  };

  const [processedSpriteData, setProcessedSpriteData] = React.useState(null);
  const [spriteStyle, setSpriteStyle] = React.useState({});
  const [originalSpriteUrl, setOriginalSpriteUrl] = React.useState(null);

  React.useEffect(() => {
    let blobUrl = null;

    fetch(spriteUrl)
      .then((res) => res.blob())
      .then((blob) => {
        blobUrl = URL.createObjectURL(blob);
        const spriteImage = new Image();
        spriteImage.crossOrigin = "anonymous";
        spriteImage.onload = () => {
          // BYPASS CROPPING: Draw sprite as-is, no cropping or bounds calculation
          const sourceCanvas = document.createElement("canvas");
          const sourceContext = sourceCanvas.getContext("2d", {
            willReadFrequently: true,
          });
          sourceCanvas.width = spriteImage.naturalWidth;
          sourceCanvas.height = spriteImage.naturalHeight;
          sourceContext.drawImage(spriteImage, 0, 0);

          setOriginalSpriteUrl(sourceCanvas.toDataURL());

          // Scale the original sprite (no cropping)
          // Use separate horizontal/vertical scales so sprites can be nudged wider
          const manualScaleY = 1.98; // vertical scale (height)
          const manualScaleX = manualScaleY * 1.0095; // horizontal scale (width) - 5% wider
          const scaledWidth = Math.floor(sourceCanvas.width * manualScaleX);
          const scaledHeight = Math.floor(sourceCanvas.height * manualScaleY);

          const scaledCanvas = document.createElement("canvas");
          scaledCanvas.width = scaledWidth;
          scaledCanvas.height = scaledHeight;
          const scaledContext = scaledCanvas.getContext("2d", {
            willReadFrequently: true,
          });
          scaledContext.imageSmoothingEnabled = false;
          scaledContext.drawImage(
            sourceCanvas,
            0,
            0,
            scaledWidth,
            scaledHeight,
          );

          setProcessedSpriteData(scaledCanvas.toDataURL());

          // Manually set sprite position (adjust these values as needed)
          // Position sprite centered at bottom of the sprite container
          // Use `bottom` anchoring so the sprite remains stuck to the container bottom
          // Anchor sprite to bottom of the sprite container
          setSpriteStyle({
            position: "absolute",
            left: "50%",
            bottom: `0px`,
            transform: "translateX(-50%) scaleX(-1)", // center horizontally and flip
            imageRendering: "pixelated",
          });
        };
        spriteImage.src = blobUrl;
      })
      .catch((error) => {
        setProcessedSpriteData(spriteUrl);
      });

    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [spriteUrl]);

  return (
    <div className={`Pokecard-wrapper ${props.showGrid ? "show-grid" : ""}`}>
      {/* ...removed show original sprite border button and image... */}
      <div className="Pokecard-row-wrapper">
        <div
          className="Pokecard"
          style={props.showGbcFilter === false ? { filter: "none" } : {}}
        >
          {/* Screenshot overlay (transparency) */}
          {props.showScreenshotOverlay &&
            (props.name && props.name.toLowerCase() === "pikachu" ? (
              <BlueOverlayImage
                src="assets/original_gb_screenshot_pikachu.png"
                alt="Pikachu GB Overlay"
                className="Pokecard-screenshot-overlay"
              />
            ) : (
              <BlueOverlayImage
                src="assets/original_gb_screenshot.png"
                alt="GB Overlay"
                className="Pokecard-screenshot-overlay"
              />
            ))}
          {/* Sprite area */}
          <div className="Pokecard-sprite">
            {processedSpriteData && (
              <img
                src={processedSpriteData}
                alt={props.name}
                style={spriteStyle}
              />
            )}
          </div>
          {/* HP Bar (behind card image) */}
          <div className="Pokecard-hpbar">
            <div
              className="Pokecard-hpfill"
              style={{ width: `${hpPercentage}%` }}
            />
          </div>
          {/* Grid-aligned text layer */}
          <div className="Pokecard-grid">
            {/* Row 1: Name */}
            <GridText startCol={9} row={1} half="top">
              {props.name.toUpperCase()}
            </GridText>
            <GridText startCol={15} row={2} half="top">
              {level}
            </GridText>
            {/* Row 4: HP values */}
            <GridText startCol={12} row={4} half="top">
              {String(currentHp).padStart(3, " ") +
                "/" +
                String(maxHp).padStart(3, " ")}
            </GridText>
            {/* Row 6: Status */}
            <GridText startCol={9} row={6} half="top">
              STATUS/OK
            </GridText>
            {/* Row 7: Pokedex Number */}
            <GridText startCol={3} row={7} half="top">
              {pokedexNumber}
            </GridText>
            {/* Row 8-11: Stats (left side) */}
            <GridText startCol={1} row={9} half="bottom">
              ATTACK
            </GridText>
            <GridText startCol={6} row={10} half="bottom">
              {String(stats.attack).padStart(3, " ")}
            </GridText>
            <GridText startCol={1} row={11} half="bottom">
              DEFENSE
            </GridText>
            <GridText startCol={6} row={12} half="bottom">
              {String(stats.defense).padStart(3, " ")}
            </GridText>
            <GridText startCol={1} row={13} half="bottom">
              SPEED
            </GridText>
            <GridText startCol={6} row={14} half="bottom">
              {String(stats.speed).padStart(3, " ")}
            </GridText>
            <GridText startCol={1} row={15} half="bottom">
              SPECIAL
            </GridText>
            <GridText startCol={6} row={16} half="bottom">
              {String(stats.special).padStart(3, " ")}
            </GridText>
            {/* Meta (right side) */}
            <GridText startCol={10} row={9} half="bottom">
              TYPE1/
            </GridText>
            <GridText startCol={11} row={10} half="bottom">
              {props.type.toUpperCase()}
            </GridText>
            {props.type2 && (
              <>
                <GridText startCol={10} row={11} half="bottom">
                  TYPE2/
                </GridText>
                <GridText startCol={11} row={12} half="bottom">
                  {props.type2.toUpperCase()}
                </GridText>
              </>
            )}
            <GridText startCol={12} row={13} half="bottom">
              /
            </GridText>
            <GridText startCol={12} row={14} half="bottom">
              {formattedIdNo}
            </GridText>
            <GridText startCol={10} row={15} half="bottom">
              OT/
            </GridText>
            <GridText startCol={12} row={16} half="bottom">
              Ash
            </GridText>
          </div>
        </div>
      </div>
    </div>
  );
}

// Overlay image component that converts black pixels to light blue
function BlueOverlayImage({ src, className, alt }) {
  const [dataUrl, setDataUrl] = React.useState(null);
  React.useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imageData.data;
      const w = canvas.width;
      const h = canvas.height;

      // Sample corner pixels to determine the background color (handles off-white backgrounds)
      function samplePixel(x, y) {
        const idx = (y * w + x) * 4;
        return [d[idx], d[idx + 1], d[idx + 2]];
      }
      const corners = [];
      if (w > 2 && h > 2) {
        corners.push(samplePixel(1, 1));
        corners.push(samplePixel(w - 2, 1));
        corners.push(samplePixel(1, h - 2));
        corners.push(samplePixel(w - 2, h - 2));
      } else {
        corners.push(samplePixel(0, 0));
      }
      const bg = corners
        .reduce(
          (acc, c) => [acc[0] + c[0], acc[1] + c[1], acc[2] + c[2]],
          [0, 0, 0],
        )
        .map((v) => Math.round(v / corners.length));

      const bgThreshold = 60; // color-distance threshold to consider "background"

      for (let i = 0; i < d.length; i += 4) {
        const r = d[i];
        const g = d[i + 1];
        const b = d[i + 2];
        const a = d[i + 3];

        // If pixel is "black" (all channels < 40) -> turn to blue
        if (r < 40 && g < 40 && b < 40 && a > 0) {
          d[i] = 0; // R
          d[i + 1] = 102; // G
          d[i + 2] = 255; // B (pure blue)
        } else {
          // Compute color distance to sampled background
          const dr = r - bg[0];
          const dg = g - bg[1];
          const db = b - bg[2];
          const dist = Math.sqrt(dr * dr + dg * dg + db * db);
          if (dist < bgThreshold) {
            // Make background-like pixels fully transparent
            d[i + 3] = 0;
          }
        }
      }
      ctx.putImageData(imageData, 0, 0);
      setDataUrl(canvas.toDataURL());
    };
    img.src = src;
  }, [src]);
  if (!dataUrl) return null;
  return <img src={dataUrl} className={className} alt={alt} />;
}
