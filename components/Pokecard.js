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
  // Removed showOriginalBorder state

  React.useEffect(() => {
    let blobUrl = null;

    fetch(spriteUrl)
      .then((res) => res.blob())
      .then((blob) => {
        blobUrl = URL.createObjectURL(blob);
        const spriteImage = new Image();
        spriteImage.crossOrigin = "anonymous";
        spriteImage.onload = () => {
          const sourceCanvas = document.createElement("canvas");
          const sourceContext = sourceCanvas.getContext("2d", {
            willReadFrequently: true,
          });

          sourceCanvas.width = spriteImage.naturalWidth;
          sourceCanvas.height = spriteImage.naturalHeight;
          sourceContext.drawImage(spriteImage, 0, 0);

          // Cache the original sprite as a data URL BEFORE any modification
          setOriginalSpriteUrl(sourceCanvas.toDataURL());

          const imageData = sourceContext.getImageData(
            0,
            0,
            sourceCanvas.width,
            sourceCanvas.height,
          );
          const pixelData = imageData.data;

          // Replace white pixels with transparency
          for (let i = 0; i < pixelData.length; i += 4) {
            const red = pixelData[i];
            const green = pixelData[i + 1];
            const blue = pixelData[i + 2];
            if (red > 250 && green > 250 && blue > 250) {
              pixelData[i + 3] = 0;
            }
          }
          sourceContext.putImageData(imageData, 0, 0);

          // Re-read after white removal
          const cleanedImageData = sourceContext.getImageData(
            0,
            0,
            sourceCanvas.width,
            sourceCanvas.height,
          );
          const cleanedPixels = cleanedImageData.data;

          let boundLeft = sourceCanvas.width,
            boundTop = sourceCanvas.height;
          let boundRight = 0,
            boundBottom = 0;

          for (let y = 0; y < sourceCanvas.height; y++) {
            for (let x = 0; x < sourceCanvas.width; x++) {
              const alpha = cleanedPixels[(y * sourceCanvas.width + x) * 4 + 3];
              if (alpha > 0) {
                if (x < boundLeft) boundLeft = x;
                if (x > boundRight) boundRight = x;
                if (y < boundTop) boundTop = y;
                if (y > boundBottom) boundBottom = y;
              }
            }
          }

          const croppedWidth = boundRight - boundLeft + 1;
          const croppedHeight = boundBottom - boundTop + 1;

          // First crop to bounds
          const croppedCanvas = document.createElement("canvas");
          croppedCanvas.width = croppedWidth;
          croppedCanvas.height = croppedHeight;
          const croppedContext = croppedCanvas.getContext("2d", {
            willReadFrequently: true,
          });
          croppedContext.drawImage(
            sourceCanvas,
            boundLeft,
            boundTop,
            croppedWidth,
            croppedHeight,
            0,
            0,
            croppedWidth,
            croppedHeight,
          );
          // Crop and scale sprite
          const manualScale = 2; // <--- Change this value to scale all sprites
          const scaledWidth = Math.floor(croppedWidth * manualScale);
          const scaledHeight = Math.floor(croppedHeight * manualScale);

          const scaledCanvas = document.createElement("canvas");
          scaledCanvas.width = scaledWidth;
          scaledCanvas.height = scaledHeight;
          const scaledContext = scaledCanvas.getContext("2d", {
            willReadFrequently: true,
          });
          scaledContext.imageSmoothingEnabled = false;
          scaledContext.drawImage(
            croppedCanvas,
            0,
            0,
            scaledWidth,
            scaledHeight,
          );

          setProcessedSpriteData(scaledCanvas.toDataURL());

          // Calculate the Y position for the bottom of the sprite to align with row 7 (start of 7th row, 0-based index 6)
          const gridPadding = getComputedStyle(document.body)
            .getPropertyValue("--grid-padding")
            .trim();
          const rowHeight = getComputedStyle(document.body)
            .getPropertyValue("--row-height")
            .trim();
          // Remove 'px' and parse as float
          const gridPaddingPx = parseFloat(gridPadding);
          const rowHeightPx = parseFloat(rowHeight);
          // Align bottom left of sprite with start of row 6

          // Manually set sprite position (adjust these values as needed)
          const manualLeft = 31.5; // px from left
          const manualBottom = 172.75; // px from bottom
          // To align bottom left, set top = (container height - manualBottom - sprite height)
          const container = document.querySelector(".Pokecard-sprite");
          let containerHeight = 0;
          if (container) {
            containerHeight = container.offsetHeight;
          } else {
            // fallback: use card height (288px for 320px width)
            containerHeight = 288;
          }

          // Optionally, allow per-sprite scale override via props (uncomment if needed)
          // const scale = props.spriteScale || manualScale;

          const top = containerHeight - manualBottom - scaledHeight;

          setSpriteStyle({
            position: "absolute",
            left: `${manualLeft}px`,
            top: `${top}px`,
            transform: "scaleX(-1)", // only flip, no centering
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
      {/* Column numbers (top) */}
      {props.showGrid && (
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
        {props.showGrid && (
          <div className="Pokecard-row-labels">
            {Array.from({ length: 18 }, (_, i) => (
              <span key={i} className="Pokecard-label">
                {i}
              </span>
            ))}
          </div>
        )}
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
      for (let i = 0; i < d.length; i += 4) {
        // If pixel is "black" (all channels < 40)
        if (d[i] < 40 && d[i + 1] < 40 && d[i + 2] < 40 && d[i + 3] > 0) {
          d[i] = 0; // R
          d[i + 1] = 102; // G
          d[i + 2] = 255; // B (pure blue)
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
