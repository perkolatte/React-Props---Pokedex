// Utility: Sprite processing for Pokecard
function processSprite({
  spriteUrl,
  setOriginalSpriteUrl,
  setProcessedSpriteData,
  setSpriteStyle,
  props,
}) {
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
        setOriginalSpriteUrl(sourceCanvas.toDataURL());
        const imageData = sourceContext.getImageData(
          0,
          0,
          sourceCanvas.width,
          sourceCanvas.height,
        );
        const pixelData = imageData.data;
        for (let i = 0; i < pixelData.length; i += 4) {
          const red = pixelData[i];
          const green = pixelData[i + 1];
          const blue = pixelData[i + 2];
          if (red > 250 && green > 250 && blue > 250) {
            pixelData[i + 3] = 0;
          }
        }
        sourceContext.putImageData(imageData, 0, 0);
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
        const manualScale = 2;
        const scaledWidth = Math.floor(croppedWidth * manualScale);
        const scaledHeight = Math.floor(croppedHeight * manualScale);
        const scaledCanvas = document.createElement("canvas");
        scaledCanvas.width = scaledWidth;
        scaledCanvas.height = scaledHeight;
        const scaledContext = scaledCanvas.getContext("2d", {
          willReadFrequently: true,
        });
        scaledContext.imageSmoothingEnabled = false;
        scaledContext.drawImage(croppedCanvas, 0, 0, scaledWidth, scaledHeight);
        setProcessedSpriteData(scaledCanvas.toDataURL());
        const manualLeft = 31.5;
        const manualBottom = 172.75;
        const container = document.querySelector(".Pokecard-sprite");
        let containerHeight = 0;
        if (container) {
          containerHeight = container.offsetHeight;
        } else {
          containerHeight = 288;
        }
        const top = containerHeight - manualBottom - scaledHeight;
        setSpriteStyle({
          position: "absolute",
          left: `${manualLeft}px`,
          top: `${top}px`,
          transform: "scaleX(-1)",
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
}
