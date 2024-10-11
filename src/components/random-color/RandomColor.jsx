import { useState } from "react";
import "./randomcolor.css"; // Assuming you have a CSS file for additional modern styles.

const RandomColor = () => {
  const [color, setColor] = useState("#000000");
  const [isGradient, setIsGradient] = useState(false);
  const [palette, setPalette] = useState([]);

  // Utility to generate a random number within a range
  const randomValue = (length) => Math.floor(Math.random() * length);

  // Generate a random HEX or RGB color
  const generateRandomColor = (format = "hex") => {
    if (format === "hex") {
      const hex = "0123456789ABCDEF";
      let hexColor = "#";
      for (let i = 0; i < 6; i++) {
        hexColor += hex[randomValue(16)];
      }
      return hexColor;
    } else if (format === "rgb") {
      return `rgb(${randomValue(256)}, ${randomValue(256)}, ${randomValue(
        256
      )})`;
    }
  };

  // Generate a random gradient
  const generateRandomGradient = () => {
    const color1 = generateRandomColor("hex");
    const color2 = generateRandomColor("hex");
    return `linear-gradient(45deg, ${color1}, ${color2})`;
  };

  // Handle random color generation (hex, rgb, or gradient)
  const handleGenerateColor = (type = "hex") => {
    let newColor;
    if (isGradient) {
      newColor = generateRandomGradient();
    } else {
      newColor = generateRandomColor(type);
    }
    setColor(newColor);
    setPalette([newColor, ...palette.slice(0, 4)]); // Store the latest 5 colors in palette
  };

  // Copy color to clipboard
  const copyToClipboard = (colorToCopy) => {
    navigator.clipboard.writeText(colorToCopy);
    alert(`Copied ${colorToCopy} to clipboard!`);
  };

  return (
    <div
      className="color-generator"
      style={{ background: color, transition: "background 0.6s ease-in-out" }}
    >
      <div className="controls">
        <button
          className="toggle-gradient"
          onClick={() => setIsGradient(!isGradient)}
        >
          {isGradient ? "Disable Gradient" : "Enable Gradient"}
        </button>
        <button onClick={() => handleGenerateColor("hex")}>
          Generate HEX Color
        </button>
        <button onClick={() => handleGenerateColor("rgb")}>
          Generate RGB Color
        </button>
      </div>

      <div className="color-display">
        <h3>{color}</h3>
        <button className="copy-btn" onClick={() => copyToClipboard(color)}>
          Copy Color
        </button>
      </div>

      <div className="palette">
        <h4>Color Palette</h4>
        <div className="palette-grid">
          {palette.map((paletteColor, index) => (
            <div
              key={index}
              className="palette-item"
              style={{ background: paletteColor }}
              onClick={() => copyToClipboard(paletteColor)}
              title="Click to copy"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RandomColor;
