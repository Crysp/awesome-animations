import fs from "fs";
import path from "path";
import opentype from "opentype.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fontFormats = [".ttf", ".otf"];
const fontsPath = path.join(__dirname, "..", "assets", "fonts");
const filenames = fs.readdirSync(fontsPath);

filenames.forEach((filename) => {
  const extension = path.extname(filename)

  if (!fontFormats.includes(extension)) {
    return;
  }

  const fontPath = path.join(fontsPath, filename);
  const font = opentype.loadSync(fontPath);

  const newFilename = font.names.postScriptName.en + extension;
  const newFontPath = path.join(fontsPath, newFilename);

  const relativeFontPath = path.relative(__dirname, fontPath);
  const relativeNewFontPath = path.relative(__dirname, newFontPath);

  if (filename === newFilename) {
    console.log(`${relativeFontPath} is already named correctly.`);
  } else {
    fs.renameSync(fontPath, newFontPath);

    console.log(`Renamed ${relativeFontPath} to ${relativeNewFontPath}.`);
  }
});
