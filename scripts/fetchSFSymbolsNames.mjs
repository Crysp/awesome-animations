import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import prettier from 'prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const generatedDir = path.join(__dirname, '../src/__generated__');
const SFSymbolsNamesFile = path.join(generatedDir, 'sfSymbolsNames.ts');

fetch(
  'https://raw.githubusercontent.com/noahsark769/sfsymbols.com/master/src/data/symbols.json',
).then(async response => {
  if (response.status !== 200) {
    process.exit(0);
  }

  let names = [];

  try {
    const json = await response.json();

    if (json && Array.isArray(json)) {
      names = json;
    } else {
      console.error('Response does not contain list');
      process.exit(0);
    }
  } catch (e) {
    console.error(e);
    process.exit(0);
  }

  if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir);
  }

  prettier.resolveConfig(process.cwd()).then(prettierConfig => {
    const code = prettier.format(`export type SFSymbols = '${names.join("'|'")}'`, prettierConfig);
    fs.writeFileSync(SFSymbolsNamesFile, code);
  });
});
