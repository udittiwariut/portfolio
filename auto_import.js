import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.join(__dirname, "/public/assets");
const outputFile = path.join(__dirname, "/src/conts/imports.ts");
const outputFileNAME = path.join(__dirname, "/src/conts/assetsConts.ts");

function toConstName(fileName) {
  return fileName
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9]/g, "_")
    .toUpperCase();
}

function removeExtension(fileName) {
  return fileName.replace(/\.[^/.]+$/, "");
}

let imports = [];

let exports = [];

let names = [];

let assetsConst = [];

function generateExports(dirPath, relPath = "") {
  const fullPath = path.join(dirPath, relPath);
  const entries = fs.readdirSync(fullPath, { withFileTypes: true });

  for (let entry of entries) {
    if (entry.isFile() && /\.(png|jpe?g|svg)$/i.test(entry.name)) {
      const varName = toConstName(entry.name);
      const url = path.posix.join("/assets", relPath, entry.name).replace(/\\/g, "/");
      imports.push(`import ${varName}_IMAGE from "./../../public${url}";`);
      exports.push(`export const ${varName} = ${varName}_IMAGE`);
      names.push(varName);
      assetsConst.push(`{tileSet:${varName}, name:"${removeExtension(entry.name)}"}`);
    } else if (entry.isDirectory()) {
      generateExports(dirPath, path.join(relPath, entry.name));
    }
  }
}

generateExports(baseDir);

const assetsImport = `import {${names.join(",")}} from "./imports" 
  
   export const ASSETS_CONSTANT_1 = [${assetsConst.join(",")}]
  `;

const import_and_export = `${imports.join("\n")}
  \n
  \n
    ${exports.join("\n")}
  `;

fs.writeFileSync(outputFile, import_and_export);

fs.writeFileSync(outputFileNAME, "");

fs.appendFileSync(outputFileNAME, assetsImport);
