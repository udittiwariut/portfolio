// NAME EXPORT

const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "/src/conts/imports.ts");

function toConstName(fileName) {
  return fileName
    .replace(/\.[^/.]+$/, "") // remove extension
    .replace(/[^a-zA-Z0-9]/g, "_") // replace special chars
    .toUpperCase();
}

function generateExports(dirPath) {
  const fullPath = path.join(dirPath);
  const entries = fs.readFileSync(fullPath, { withFileTypes: true });

  for (let e of entries) {
    console.log(e);
  }

  let lines = [];

  // for (let entry of entries) {
  //   if (entry.isFile() && /\.(png|jpe?g|svg)$/i.test(entry.name)) {
  //     const varName = toConstName(path.join(relPath, entry.name));
  //     const url = path.posix.join("/assets", relPath, entry.name).replace(/\\/g, "/");
  //     lines.push(`export const ${varName} = "./../../public${url}";`);
  //   } else if (entry.isDirectory()) {
  //     lines.push(...generateExports(dirPath, path.join(relPath, entry.name)));
  //   }
  // }

  return lines;
}
generateExports(baseDir);

// fs.writeFileSync(outputFile, lines.join("\n"));
