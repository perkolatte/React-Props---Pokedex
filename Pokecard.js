let tallestPokemon = { name: "", id: 0, height: 0 };

function Pokecard(props) {
  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/yellow/${props.id}.png`;
  const formattedIdNo = String(props.id).padStart(5, "0");
  const pokedexNumber = String(props.id).padStart(3, "0");
  const level = Number(props.level) || 1;
  const maxHp = Math.max(1, level * 3);
  const currentHp = maxHp;
  const hpPercentage = Math.min(
    100,
    Math.max(8, Math.floor((currentHp / maxHp) * 100))
  );
  const stats = {
    attack: Math.max(1, Math.floor(level * 1.8)),
    defense: Math.max(1, Math.floor(level * 1.7)),
    speed: Math.max(1, Math.floor(level * 1.6)),
    special: Math.max(1, Math.floor(level * 1.9)),
  };

  const [processedSpriteData, setProcessedSpriteData] = React.useState(null);
  const [spriteStyle, setSpriteStyle] = React.useState({});

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
          const sourceContext = sourceCanvas.getContext("2d");

          sourceCanvas.width = spriteImage.naturalWidth;
          sourceCanvas.height = spriteImage.naturalHeight;
          sourceContext.drawImage(spriteImage, 0, 0);

          const imageData = sourceContext.getImageData(
            0,
            0,
            sourceCanvas.width,
            sourceCanvas.height
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
            sourceCanvas.height
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

          // Debug: log if sprite touches bottom of source image
          if (boundBottom >= sourceCanvas.height - 1) {
            console.log(`${props.name} touches bottom of source image`);
          } else {
            console.log(
              `${props.name} has ${
                sourceCanvas.height - 1 - boundBottom
              }px gap at bottom`
            );
          }

          if (croppedHeight > tallestPokemon.height) {
            tallestPokemon = {
              name: props.name,
              id: props.id,
              height: croppedHeight,
            };
            console.log(
              `New tallest: ${props.name} (${props.id}): ${croppedHeight}px`
            );
          }

          // First crop to bounds
          const croppedCanvas = document.createElement("canvas");
          croppedCanvas.width = croppedWidth;
          croppedCanvas.height = croppedHeight;
          const croppedContext = croppedCanvas.getContext("2d");
          croppedContext.drawImage(
            sourceCanvas,
            boundLeft,
            boundTop,
            croppedWidth,
            croppedHeight,
            0,
            0,
            croppedWidth,
            croppedHeight
          );

          // Downscale for pixelation effect
          // const pixelScale = 0.9; // Lower = more pixelated
          // const lowResWidth = Math.max(1, Math.floor(croppedWidth * pixelScale));
          // const lowResHeight = Math.max(1, Math.floor(croppedHeight * pixelScale));

          // const lowResCanvas = document.createElement("canvas");
          // lowResCanvas.width = lowResWidth;
          // lowResCanvas.height = lowResHeight;
          // const lowResContext = lowResCanvas.getContext("2d");
          // lowResContext.imageSmoothingEnabled = false;
          // lowResContext.drawImage(croppedCanvas, 0, 0, lowResWidth, lowResHeight);

          // Scale up with display multiplier
          const spriteScale = 1.9; // Adjust this to make all sprites bigger/smaller
          const scaledWidth = Math.floor(croppedWidth * spriteScale);
          const scaledHeight = Math.floor(croppedHeight * spriteScale);

          const scaledCanvas = document.createElement("canvas");
          scaledCanvas.width = scaledWidth;
          scaledCanvas.height = scaledHeight;
          const scaledContext = scaledCanvas.getContext("2d");
          scaledContext.imageSmoothingEnabled = false;
          scaledContext.drawImage(
            croppedCanvas,
            0,
            0,
            scaledWidth,
            scaledHeight
          );

          setProcessedSpriteData(scaledCanvas.toDataURL());

          setSpriteStyle({
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%) scaleX(-1)",
            imageRendering: "pixelated",
          });
        };
        spriteImage.src = blobUrl;
      })
      .catch((error) => {
        console.error("Failed to load sprite:", error);
        setProcessedSpriteData(spriteUrl);
      });

    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [spriteUrl]);

  return (
    <div className="Pokecard">
      <div className="Pokecard-top">
        <div className="Pokecard-sprite">
          {processedSpriteData && (
            <img
              src={processedSpriteData}
              alt={props.name}
              style={spriteStyle}
            />
          )}
        </div>
        <div className="Pokecard-summary">
          <div className="Pokecard-name">{props.name}</div>
          <div className="Pokecard-level">{level}</div>
          <div className="Pokecard-hp">
            <div className="Pokecard-hpbar">
              <div
                className="Pokecard-hpfill"
                style={{ width: `${hpPercentage}%` }}
              />
            </div>
          </div>
          <div className="Pokecard-hptext">
            <span className="Pokecard-hpcurrent">{currentHp}</span>
            <span className="Pokecard-hpslash">/</span>
            <span className="Pokecard-hpmax">{maxHp}</span>
          </div>
          <div className="Pokecard-status">
            STATUS<span className="Pokecard-slash">/</span>OK
          </div>
        </div>
        <div className="Pokecard-no">{pokedexNumber}</div>
        <div className="Pokecard-divider" aria-hidden="true" />
      </div>

      <div className="Pokecard-bottom">
        <div className="Pokecard-stats">
          <div className="Pokecard-stat">
            <div className="Pokecard-statlabel">ATTACK</div>
            <div className="Pokecard-statvalue">{stats.attack}</div>
          </div>
          <div className="Pokecard-stat">
            <div className="Pokecard-statlabel">DEFENSE</div>
            <div className="Pokecard-statvalue">{stats.defense}</div>
          </div>
          <div className="Pokecard-stat">
            <div className="Pokecard-statlabel">SPEED</div>
            <div className="Pokecard-statvalue">{stats.speed}</div>
          </div>
          <div className="Pokecard-stat">
            <div className="Pokecard-statlabel">SPECIAL</div>
            <div className="Pokecard-statvalue">{stats.special}</div>
          </div>
        </div>
        <div className="Pokecard-meta">
          <div className="Pokecard-type">
            <div className="Pokecard-metalabel">
              TYPE1<span className="Pokecard-slash">/</span>
            </div>
            <div className="Pokecard-metavalue">{props.type}</div>
          </div>
          <div className="Pokecard-type">
            {props.type2 ? (
              <>
                <div className="Pokecard-metalabel">
                  TYPE2<span className="Pokecard-slash">/</span>
                </div>
                <div className="Pokecard-metavalue">{props.type2}</div>
              </>
            ) : (
              <>
                <div className="Pokecard-metalabel">&nbsp;</div>
                <div className="Pokecard-metavalue">&nbsp;</div>
              </>
            )}
          </div>
          <div className="Pokecard-idno">
            <span className="Pokecard-idno-slash">/</span>
            <div className="Pokecard-metavalue">{formattedIdNo}</div>
          </div>
          <div className="Pokecard-ot">
            <div className="Pokecard-metalabel">
              OT<span className="Pokecard-ot-slash">/</span>
            </div>
            <div className="Pokecard-metavalue">Ash</div>
          </div>
        </div>
      </div>
    </div>
  );
}
